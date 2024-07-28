const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const Booking = require("../models/booking"); // Your Mongoose model
const router = express.Router();

//***  SEE:THIS endpointSecret is for testing purposes only. You should use your live endpoint secret in production

const endpointSecret =
  "whsec_b246c22e19a0fe5f56e8bf3a03578ba1636b733ef5ac5bbfada8be3e168f1a3e";

router.post("/create-checkout-session", express.json(), async (req, res) => {
  const { user_id, hotel_id, amount, price, details, name } = req.body;
  const totalPrice = amount * price;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: name,
          },
          unit_amount: price * 100,
        },
        quantity: amount,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/bookings",
    cancel_url: "http://localhost:3000/error",
    metadata: {
      user_id,
      hotel_id,
      price,
      amount,
      totalPrice,
      details,
    },
  });

  res.send({ url: session.url });
});

// Webhook endpoint
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let event;

    // Get the signature sent by Stripe
    const signature = request.headers["stripe-signature"];

    // Verify webhook signature
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
      //  console.log("Webhook verified:", event); // Log the verified event
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        //console.log("Checkout session completed:", session); // Log session data

        try {
          await Booking.create({
            user_id: session.metadata.user_id,
            hotel_id: session.metadata.hotel_id,
            amount: session.metadata.amount,
            price: session.metadata.price,
            totalPrice: session.metadata.totalPrice,
            details: session.metadata.details,
            payment_status: "succeeded",
            invoice: session.receipt_url,
            payment_intent: session.payment_intent,
          });
        } catch (error) {
          console.log("Error creating booking record:", error.message); // Log error if booking creation fails
        }
        break;

      case "charge.updated":
        const paymentIntent = event.data.object;
        await Booking.findOneAndUpdate(
          { payment_intent: paymentIntent.payment_intent },
          { invoice: paymentIntent.receipt_url }
        );

        break;

      default:
        console.log(`Unhandled event type ${event.type}.`); // Log unhandled event types
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

module.exports = router;

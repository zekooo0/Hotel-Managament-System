const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("./models/Booking");
const User = require("./models/User");

exports.createPaymentIntent = async (bookingId) => {
  const booking = await Booking.findById(bookingId).populate("user");
  const amount = booking.amount * 100; // Stripe works with the smallest currency unit (cents for USD)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    customer: booking.user.stripeCustomerId,
    metadata: { bookingId: booking._id.toString() },
  });

  booking.stripePaymentIntentId = paymentIntent.id;
  await booking.save();

  return paymentIntent;
};

exports.webhook = (request, response) => {
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_ENDPOINT_SECRET
    );
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    Booking.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { paymentStatus: "paid" },
      (err, booking) => {
        if (err) {
          console.error(err);
          return response.status(500).send("Server Error");
        }
        response.status(200).json({ received: true });
      }
    );
  } else {
    response.status(400).send("Unhandled event type");
  }
};

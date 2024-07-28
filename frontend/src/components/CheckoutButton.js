import React from "react";
import axios from "axios";

const CheckoutButton = ({
  price,
  amount,
  details,
  name,
  user_id,
  hotel_id,
}) => {
  const data = { price, amount, name, user_id, hotel_id, details };
  const handleCheckout = async () => {
    if (!price || !amount || !name || !user_id || !hotel_id) return;
    const res = await axios.post(
      "http://localhost:5000/api/stripe/create-checkout-session",
      data
    );
    console.log(res);
    if (res.data.url) window.location.href = res.data.url;
  };
  return (
    <button
      className="px-6 py-3 text-white bg-gray-900 rounded-md"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;

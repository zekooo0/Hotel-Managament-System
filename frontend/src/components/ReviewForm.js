import Rating from "@mui/material/Rating";
import axios from "axios";
import { useState } from "react";

const ReviewForm = ({ user_id, hotel_id }) => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value === 0) {
      alert("Please select a rating");
      return;
    }
    if (comment === "") {
      alert("Please enter a comment");
      return;
    }
    await axios.post("http://localhost:5000/api/reviews", {
      user_id,
      hotel_id,
      rating: value,
      comment,
    });
    setValue(0);
    setComment("");
  };
  return (
    <form className="flex flex-col items-start gap-2" onSubmit={handleSubmit}>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="lg:w-1/2 w-full p-2 border border-gray-300 rounded-md resize-y"
      ></textarea>
      <button className="px-4 py-2 text-white bg-blue-500 rounded-md">
        Submit
      </button>
    </form>
  );
};

export default ReviewForm;

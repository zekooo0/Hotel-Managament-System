import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Star } from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "./AuthContext";

const RoomCard = ({ room }) => {
  const { _id, name, images, location, pricing, averageRating } = room;
  const { user } = useAuth();
  const [review, setReview] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/hotels/${_id}/reviews/${user._id}`
        );
        setReview(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user._id, _id]);

  return (
    <Link to={`/rooms/${_id}`} className="max-w-[337px] text-decoration-none">
      <div>
        <img
          src={images[0].imageBase64}
          alt={images[0].filename}
          className="rounded-2xl"
        />
      </div>
      <div className=" py-2">
        <div className="flex items-center justify-between">
          <h1 className=" mb-0 text-base font-medium text-black">{name}</h1>
          <span className="flex items-center text-base font-medium text-black">
            <Star fontSize="14" />
            {averageRating}
          </span>
        </div>
        <h3 className=" text-base text-gray-400">
          {location.city}, {location.country}
        </h3>
        <h3 className="text-base text-black">
          {" "}
          <span className=" font-medium">
            {pricing.minPricePerNight} - {pricing.maxPricePerNight}$
          </span>{" "}
          <span className=" font-light">night</span>
        </h3>
        {review && (
          <h3 className="text-base text-black">
            <span className=" font-medium">
              {review.rating} <Star fontSize="12" />
            </span>{" "}
            <span className=" font-light">{review.comment}</span>
          </h3>
        )}
      </div>
    </Link>
  );
};

export default RoomCard;

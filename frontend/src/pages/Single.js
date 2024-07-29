import React, { useEffect, useState } from "react";

import Check from "../images/check-svgrepo-com.svg";
import CheckoutButton from "../components/CheckoutButton";
import Gym from "../images/gym-svgrepo-com.svg";
import Parking from "../images/parking-svgrepo-com.svg";
import Pool from "../images/pool-svgrepo-com.svg";
import Rating from "@mui/material/Rating";
import ReviewForm from "../components/ReviewForm";
import WIFI from "../images/wifi-svgrepo-com.svg";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import { useParams } from "react-router-dom";

const Single = () => {
  let { id } = useParams();
  const [data, setData] = useState();
  const [reviews, setReviews] = useState();
  const [bookings, setBookings] = useState();
  const [currentImage, setCurrentImage] = useState(0);
  const [price, setPrice] = useState(null);
  const [amount, setAmount] = useState(1);
  const [details, setDetails] = useState("");
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/hotels/get/${id}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${id}`);
        setReviews(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/${user._id}`
        );
        setBookings(res.data.bookings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (user && bookings) {
      const booked = bookings.some(
        (booking) =>
          booking.user_id._id.toString() === user._id.toString() &&
          booking.hotel_id._id.toString() === id.toString()
      );
      setAlreadyBooked(booked);
    }
  }, [user, bookings, id]);

  const alreadyReviewed = reviews?.some(
    (review) => review.user_id._id.toString() === user._id.toString()
  );

  return (
    <div className="md:px-16 lg:px-32 px-8 py-8">
      {data && (
        <div>
          <div className="flex items-center justify-between">
            <h1>{data.name}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </div>
          <div>
            {data.images.length > 1 ? (
              <div className=" lg:grid flex flex-col lg:grid-cols-2 gap-4  lg:h-[410px]">
                <div className="">
                  <img
                    src={data.images[currentImage].imageBase64}
                    alt={data.images[currentImage].filename}
                    className="rounded-2xl aspect-video object-cover w-full h-full"
                  />
                </div>
                <div className=" lg:grid lg:grid-rows-auto lg:grid-cols-2 flex gap-2 overflow-y-auto">
                  {data.images.map((img, i) => (
                    <img
                      key={img._id}
                      src={img.imageBase64}
                      alt={img.filename}
                      className="rounded-2xl max-w-[150px] max-h-[100px] aspect-video hover:cursor-pointer lg:max-w-full lg:max-h-full object-cover"
                      onClick={() => setCurrentImage(i)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className=" h-[410px]">
                <img
                  src={data.images[0].imageBase64}
                  alt={data.images[0].filename}
                  className="rounded-2xl aspect-video object-cover w-full h-full"
                />
              </div>
            )}
          </div>
          <div className=" lg:flex-row lg:items-start relative flex flex-col items-center py-4">
            <div className="lg:w-1/2 w-full">
              <h3>{data.location.address}</h3>
              <p>{data.description}</p>
              <div className="lg:pb-2 ">
                <h3>what is this place offers</h3>
                <div className="grid-rows-auto grid grid-cols-2">
                  {data.amenities.includes("Free Wi-Fi") && (
                    <p className="flex items-center gap-2">
                      <span>
                        <img src={WIFI} className="w-[25px]" alt="wifi" />
                      </span>
                      Free WIFI
                    </p>
                  )}
                  {data.amenities.includes("Pool") && (
                    <p className="flex items-center gap-2">
                      <span>
                        <img src={Pool} className="w-[25px]" alt="pool" />
                      </span>
                      Pool
                    </p>
                  )}
                  {data.amenities.includes("Gym") && (
                    <p className="flex items-center gap-2">
                      <span>
                        <img src={Gym} className="w-[25px]" alt="gym" />
                      </span>
                      Gym
                    </p>
                  )}
                  {data.amenities.includes("Parking") && (
                    <p className="flex items-center gap-2">
                      <span>
                        <img src={Parking} className="w-[25px]" alt="parking" />
                      </span>
                      Parking
                    </p>
                  )}
                </div>
              </div>
              <div className="lg:pb-2 ">
                <h3> Booking Calender</h3>
                <a
                  target="_blank"
                  href={data.availability.bookingCalender}
                  className="underline cursor-pointer"
                  rel="noreferrer"
                >
                  {data.availability.bookingCalendar}
                </a>
              </div>
              <div>
                <h3>Contact Info.</h3>
                <p>Email: {data.contactInfo.emailAddress}</p>
                <p>Phone: {data.contactInfo.phoneNumber}</p>
              </div>
            </div>
            {/* right */}
            <div className="h-fit top-5 lg:w-1/2 sticky left-0 w-full">
              <div className="rounded-2xl p-10 border shadow-md">
                <h3>
                  {data.pricing.minPricePerNight} -{" "}
                  {data.pricing.maxPricePerNight}$ night
                </h3>
                <hr />
                <p>
                  Available Rooms: {data.availability.numberOfRoomsAvailable}
                </p>
                <hr />

                <div>
                  <p>Room Types</p>
                  <div className="grid-rows-auto grid grid-cols-2">
                    {data.roomTypes.map((el) => (
                      <p key={el} className="flex items-center gap-2">
                        <img src={Check} alt="check" className="w-[25px]" />
                        <span>{el}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <hr />
                <div>
                  <p>Order</p>
                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex gap-5">
                      <input
                        id="standard"
                        type="radio"
                        value={data.pricing.minPricePerNight}
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <label htmlFor="standard">
                        Standard {data.pricing.minPricePerNight}$
                      </label>
                    </div>

                    <div className="flex gap-5">
                      <input
                        id="deluxe"
                        type="radio"
                        value={
                          (data.pricing.minPricePerNight +
                            data.pricing.maxPricePerNight) /
                          2
                        }
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <label htmlFor="deluxe">
                        Deluxe{" "}
                        {(data.pricing.minPricePerNight +
                          data.pricing.maxPricePerNight) /
                          2}
                        $
                      </label>
                    </div>
                    <div className=" flex gap-5">
                      <input
                        id="suite"
                        type="radio"
                        value={data.pricing.maxPricePerNight}
                        name="price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <label htmlFor="suite">
                        Suite {data.pricing.maxPricePerNight}$
                      </label>
                    </div>
                    <div>
                      <h6>Amount: </h6>
                      <select
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        className=" w-20 border border-gray-300 rounded-md"
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                      </select>
                    </div>
                    <div>
                      <h6>Additional Details</h6>
                      <textarea
                        placeholder="Additional Details"
                        className="w-full h-24 p-2 border border-gray-300 rounded-md resize-y"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                      ></textarea>
                    </div>
                    <div>
                      <h6>Total Price: </h6> <h3>{amount * price}$</h3>
                    </div>
                    <CheckoutButton
                      price={price}
                      amount={amount}
                      name={data.name}
                      user_id={user._id}
                      hotel_id={data._id}
                      details={details}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          {alreadyBooked && !alreadyReviewed && (
            <ReviewForm hotel_id={id} user_id={user._id} />
          )}
          <div className="mt-4">
            <h3>Reviews</h3>
            <div>
              {data &&
                reviews.map((review) => (
                  <div key={review._id}>
                    <div className="flex items-center gap-2">
                      <h4 className="m-0">{review.user_id.name}</h4>
                      <Rating
                        name="simple-controlled"
                        value={review.rating}
                        readOnly
                      />
                    </div>
                    <p>{review.comment}</p>
                    <hr />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Single;

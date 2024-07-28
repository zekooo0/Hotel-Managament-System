import React, { useEffect, useState } from "react";

import axios from "axios";
import { useAuth } from "../components/AuthContext";

const Bookings = () => {
  const [data, setData] = useState();
  const { user } = useAuth();
  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/${user._id}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  console.log(data);
  return (
    <div className="md:px-16 lg:px-32 px-8 py-8">
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/7">Hotel Name</th>
            <th className="w-1/7">Price</th>
            <th className="w-1/7">Amount</th>
            <th className="w-1/7">Total Price</th>
            <th className="w-1/7">Payment Status</th>
            <th className="w-1/7">Invoice</th>
            <th className="w-1/7">Details</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.bookings.map((booking) => (
              <>
                <tr key={booking._id} className="w-full">
                  <td className="w-1/7 break-words">{booking.hotel_id.name}</td>
                  <td className="w-1/7 break-words">{booking.price}</td>
                  <td className="w-1/7 break-words">{booking.amount}</td>
                  <td className="w-1/7 break-words">{booking.totalPrice}</td>
                  <td className="w-1/7 break-words">
                    {booking.payment_status}
                  </td>
                  <td className="w-1/7 break-words">
                    <a
                      href={booking.invoice}
                      rel="noreferrer"
                      target="_blank"
                      className="underline cursor-pointer"
                    >
                      Invoice
                    </a>
                  </td>
                  <td className="w-1/7">{booking.details || "No Details"}</td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;

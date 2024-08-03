import { useState, useEffect } from "react";
import { CloseButton, Button } from "react-bootstrap";
import axios from "axios";
export default function Bookingcard({
  guestCount,
  bookingDate,
  bookingTime,
  totalAmount,
  closeForm,
  restname,
  restId,
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found in localStorage.");
          return;
        }

        const response = await axios.get(
          "https://restaurantappbackend-ssw6.onrender.com/user/current-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, []);

  const handleBooking = async () => {
    try {
      const bookingResponse = await axios.post(
        "https://restaurantappbackend-ssw6.onrender.com/book/create-booking",
        {
          name: user.name,
          guests: guestCount,
          amount: totalAmount,
          date: bookingDate,
          resname: restname,
          restId: restId,
          userId: user._id,
        }
      );
      alert("Booking Successful!");
      closeForm();
    } catch (error) {
      console.error("Error processing booking:", error.message);
    }
  };
  return (
    <>
      <div className="myForm">
        <div className="d-flex justify-content-end">
          <CloseButton onClick={closeForm} />
        </div>
        {user && (
          <>
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
          </>
        )}
        <p>Guests: {guestCount}</p>
        <p>Date: {bookingDate}</p>
        <p>Time: {bookingTime}</p>
        <p>Total Amount: {totalAmount}</p>
        <Button variant="dark" onClick={handleBooking}>
          Book Now
        </Button>
      </div>
    </>
  );
}

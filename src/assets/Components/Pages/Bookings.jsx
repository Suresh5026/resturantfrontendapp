import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Payment from "./Payment";

export default function Bookings() {
  const headings = [
    "S.No",
    "Restaurant Name",
    "User Name",
    "Guest Count",
    "Booking Id",
    "Final Amount",
    "PayNow",
    "Status",
  ];

  const [book, setBook] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://restaurantappbackend-ssw6.onrender.com/book/get-bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const bookingData = response.data.data;
        setBook(bookingData);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    if (token) {
      fetchBookings();
    }
  }, []);

  const handlePayNow = (booking) => {
    setSelectedBooking(booking);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = async (transactionNumber) => {
    alert(`Payment successful. Transaction Number: ${transactionNumber}`);
    setShowPaymentForm(false);

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://restaurantappbackend-ssw6.onrender.com/book/update-booking-payment/${selectedBooking._id}`,
        { transactionNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      setBook((prevBooks) =>
        prevBooks.map((book) =>
          book._id === selectedBooking._id
            ? { ...book, status: "Paid", transactionNumber }
            : book
        )
      );
    } catch (error) {
      console.error("Error updating booking payment:", error);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
      if (!confirmCancel) {
        return; 
      }
     await axios.put(
        `https://restaurantappbackend-ssw6.onrender.com/book/cancel-booking/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      setBook((prevBooks) =>
        prevBooks.map((book) =>
          book._id === id ? {...book,status:"Cancelled"} : book
        )
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            {headings.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {book.map((element, index) => (
            <tr key={`${element.name}-${index}`}>
              <td>{index + 1}</td>
              <td>{element.resname}</td>
              <td>{element.name}</td>
              <td>{element.guests}</td>
              <td>{element._id}</td>
              <td>{element.amount}</td>
              <td>
                {
                  element.status !== "Paid" &&
                  element.status !== "Cancelled" && (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => handlePayNow(element)}
                      >
                        Pay Now
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleCancelBooking(element._id)}
                      >
                        Cancel Booking
                      </Button>
                    </>
                  )}
              </td>
              <td>{element.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {showPaymentForm && selectedBooking && (
        <Payment
          booking={selectedBooking}
          totalAmount={selectedBooking.amount}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

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

  const handleCancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this booking?"
      );
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
          book._id === id ? { ...book, status: "Cancelled" } : book
        )
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  const handleOpenRazropay = (data, userId, bookingId) => {
    const options = {
      key: "rzp_test_tGoWeh9ybvAQtC",
      amount: Number(data.amount),
      currency: "INR",
      name: "The Fork Restaurant App",
      order_id: data.id,
      handler: function (response) {
        console.log(response);
        axios
          .post("https://restaurantappbackend-ssw6.onrender.com/payment/verify", {
            response: response,
            bookingId: bookingId,
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = (amount, userId, bookingId) => {
    const data = {
      amount: Number(amount),
      userId: userId,
      bookingId: bookingId,
    };
    console.log(data);

    axios
      .post("https://restaurantappbackend-ssw6.onrender.com/payment/orders", data)
      .then((res) => {
        console.log(res.data);
        handleOpenRazropay(res.data.data, userId, bookingId);
      })
      .catch((err) => {
        console.log(err);
      });
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
                {(element.status !== "Paid" &&
                  element.status !== "Cancelled" &&
                  element.paymentStatus !== "Paid" && (
                    <>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={() => {
                          handlePayment(
                            element.amount,
                            element.userId,
                            element._id
                          );
                        }}
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
                  )) || (
                  <>
                    <div>{element.paymentStatus}</div>
                  </>
                )}
              </td>
              <td>{element.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

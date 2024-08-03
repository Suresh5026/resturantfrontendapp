import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

export default function Transaction() {
  const headings = [
    "S.No",
    "Booking Id",
    "Amount",
    "Mode of Payment",
    "Status",
    "Transaction Number",
  ];
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "https://restaurantappbackend-ssw6.onrender.com/payment/user-payments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPayments(response.data.data);
      } catch (error) {
        console.log("Error fetching user payments:", error);
      }
    };
    if (token) {
      fetchPayments();
    }
  }, []);

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
          {payments.map((element, index) => (
            <tr key={`${element.name}-${index}`}>
              <td>{index + 1}</td>
              <td>{element.bookingId}</td>
              <td>Rs.{element.amount}</td>
              <td>{element.mode}</td>
              <td>{element.status}</td>
              <td>{element.transactionNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

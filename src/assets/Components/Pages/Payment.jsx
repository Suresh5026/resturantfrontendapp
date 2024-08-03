import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
export default function Payment({booking,totalAmount,onPaymentSuccess}){
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cdnNumber, setCdnNumber] = useState("");
  const [transactionNumber, setTransactionNumber] = useState(null);

  const handlePayment = async () => {
    
    const transactionNumber = `TRXN${Math.floor(Math.random() * 1000000)}`;
    setTransactionNumber(transactionNumber);

    
    if (paymentMethod === "Card" && (!cardNumber || !cdnNumber)) {
      alert("Please enter valid card details.");
      return;
    }
    try {
      const response = await axios.post("https://restaurantappbackend-ssw6.onrender.com/payment/make-payment", {
        bookingId: booking._id,
        mode: paymentMethod === "Card" ? "credit card" : "pay-in-hotel",
      });

      onPaymentSuccess(response.data.payment.transactionNumber);
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Payment failed. Please try again.");
    }
  };


    return (
        <>
        <div>
      <h3>Payment</h3>
      <p>Total Amount: {totalAmount}</p>
      <Form.Group controlId="paymentMethod">
        <Form.Label>Payment Method</Form.Label>
        <Form.Control
          as="select"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="">Select One</option>
          <option value="Card">Card Payment</option>
          <option value="Cash">Cash in Hotel</option>
        </Form.Control>
      </Form.Group>

      {paymentMethod === "Card" && (
        <>
          <Form.Group controlId="cardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              maxLength={16}
              required
            />
          </Form.Group>
          <Form.Group controlId="cdnNumber">
            <Form.Label>CMN Number</Form.Label>
            <Form.Control
              type="text"
              value={cdnNumber}
              onChange={(e) => setCdnNumber(e.target.value)}
              maxLength={3}
              required
            />
          </Form.Group>
        </>
      )}

      <Button variant="success" onClick={handlePayment}>
        Pay
      </Button>

      {transactionNumber && (
        <Alert variant="success" className="mt-3">
          Transaction Number: {transactionNumber}<br />
          Payment Done Booked Successfully.
        </Alert>
      )}
    </div>
        </>
    )
}
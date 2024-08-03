import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import axios from "axios";
import { useParams } from "react-router-dom";
import Bookingcard from "./Bookingcard";

export default function Cardsclick() {
  const [activeTab, setActiveTab] = useState("about");
  const { id } = useParams();
  const [rest, setRest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTimings, setShowTimings] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showBookingCard, setShowBookingCard] = useState(false);
  

  useEffect(() => {
    if (id) {
      fetchRestaurant();
    }
    checkLoginStatus();
  }, [id]);





  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  };

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://restaurantappbackend-ssw6.onrender.com/restaurants/get-restaurant/${id}`
      );
      const restData = response.data.data;
      console.log(restData);
      setRest(restData);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching restaurant data:", error);
      setError("Error fetching restaurant data");
      setLoading(false);
    }
  };

  // console.log(rest.amount);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleTimings = () => {
    setShowTimings(!showTimings);
  };

  if (loading) {
    return (
      <Container className="card-container">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="card-container">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!rest) {
    return (
      <Container className="card-container">
        <Alert variant="warning">Restaurant data not found.</Alert>
      </Container>
    );
  }

  const validateForm = () => {
    const isValid = guestCount > 0 && bookingDate && bookingTime;
    setFormValid(isValid);
  };

  const handleBookNow = () => {
    if (!isLoggedIn) {
      alert("Please log in to book a table.");
      return;
    }
    
    setShowBookingCard(true);
  };

  const today = new Date().toISOString().split("T")[0];

  const calculateTotalAmount = () => {
    const totalBill = rest.amount * guestCount;
    const discount = (totalBill * rest.buckets) / 100;
    return totalBill - discount;
  };

  return (
    <Container className="card-container">
      <Row className="justify-content-center">
        <Card className="main-card">
          <Card.Img variant="top" src={rest.image} />
          <Card.Body>
            <Card.Text>
              {rest.description || "No description available."}
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <Row className="justify-content-center">
          <Card className="main-card">
            <Card.Body>
              <Container>
                <Row className="info tabs">
                  <Col
                    className={`info tab ${
                      activeTab === "about" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("about")}
                  >
                    About
                  </Col>
                  <Col
                    className={`info tab ${
                      activeTab === "menu" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("menu")}
                  >
                    Menu
                  </Col>
                  <Col
                    className={`info tab ${
                      activeTab === "book" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("book")}
                  >
                    Book A Table
                  </Col>
                </Row>
                <Row className="info details">
                  {activeTab === "menu" && (
                    <Col className="info">
                      <Menu />
                    </Col>
                  )}
                  {activeTab === "about" && rest && (
                    <Col className="info">
                      <h3>About {rest.name}</h3>
                      <p>Address : {rest.address}</p>
                      <p>Features : {rest.features}</p>
                      <p>Cuisines : {rest.cuisines}</p>
                      <p>Ratings : {rest.ratings}</p>
                      <p>
                        Timing : {rest.timing[0]}{" "}
                        <a href="#!" onClick={toggleTimings}>
                          {showTimings ? "Hide Timings" : "Show All Timings"}
                        </a>
                      </p>
                      {showTimings && (
                        <ul>
                          {rest.timing.map((time, index) => (
                            <li key={index}>{time}</li>
                          ))}
                        </ul>
                      )}
                    </Col>
                  )}
                </Row>
                {activeTab === "book" && (
                  <Row className="justify-content-center">
                    <Form>
                      <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">
                          Set Guest Count
                        </InputGroup.Text>
                        <Form.Control
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                          type="number"
                          value={guestCount}
                          onChange={(e) =>
                            setGuestCount(parseInt(e.target.value))
                          }
                          required
                        />
                      </InputGroup>
                      <Form.Group controlId="bookingDate">
                        <Form.Label>Select a Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={bookingDate}
                          min={today}
                          onChange={(e) => setBookingDate(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="bookingTime">
                        <Form.Label>Slot</Form.Label>
                        <Form.Control
                          as="select"
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          required
                        >
                          <option value="">Select One</option>
                          <option value="Breakfast">Breakfast</option>
                          <option value="Lunch">Lunch</option>
                          <option value="Dinner">Dinner</option>
                          <option value="Snack Time">Snack Time</option>
                          <option value="Tea Time">Tea Time</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                    <p></p>
                    <p style={{ color: "red" }}>
                      <strong>Total Bill : Rs. {rest.amount * guestCount}</strong>
                    </p>
                    <p style={{ color: "orange" }}>
                      <strong>Discount : {rest.buckets} % OFF</strong>
                    </p>
                    <p style={{ color: "green" }}>
                      <strong>Payment : Rs. {calculateTotalAmount()}</strong>
                    </p>
                    <Button
                      variant="success"
                      className="book-button"
                      onClick={handleBookNow}
                    >
                      Book Now
                    </Button>
                  </Row>
                )}
                {showBookingCard && (
                  <div className="position-fixed top-50 start-50 translate-middle">
                    <Bookingcard
                      restname = {rest.name}
                      restId = {rest._id}
                      guestCount={guestCount}
                      bookingDate={bookingDate}
                      bookingTime={bookingTime}
                      totalAmount={calculateTotalAmount()}
                      closeForm={() => setShowBookingCard(false)}
                    />
                  </div>
                )}
              </Container>
            </Card.Body>
          </Card>
        </Row>
      </Row>
    </Container>
  );
}

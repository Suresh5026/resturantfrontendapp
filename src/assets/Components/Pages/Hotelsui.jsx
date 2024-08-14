import { Container, Row, Col } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hotelsui() {
  const [user, setUser] = useState(null);
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

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
  }, [user]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const cityName = queryParams.get("city");
    setSelectedCity(cityName || '');
  }, [location.search]);

 
  const handleRatingChange = (event) => {
    const rating = event.target.value;
    setSelectedRating(rating);
    navigate(`/?rating=${rating}`);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
          <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item>
                {selectedCity ? `${selectedCity} Restaurants` : "Latest Restaurants"}
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                {selectedCity || "Tamilnadu"}
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col className="text-end">
          <span>{user && <h5 className="mb-0" style={{fontFamily: 'Playwrite AT, cursive', color:"green"}}>Hi {user.name} !!!</h5>}</span>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <h3>Restaurants</h3>
          </Col>
          <Col sm={1}>Sort by</Col>
          <Col sm={3}>
            <Form.Select size="sm" onChange={handleRatingChange} value={selectedRating}>
              <option>Ratings</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
              <option value="5">Five</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
  
        </Row>
      </Container>
    </>
  );
}

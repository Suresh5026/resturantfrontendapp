import Container from "react-bootstrap/Container";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../Context/Rescontext";
import { AuthContext } from "../Context/Authcontext";

export default function Mynavbar() {
  const {isLoggedIn, userRole, logout } = useContext(AuthContext);
  const [searchItem, setSearchItem] = useState("");
  const { city } = useContext(RestaurantContext);
  const navigate = useNavigate();
  console.log(userRole);
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    if (selectedCity) {
      navigate(`/?city=${selectedCity}`);
    } else {
      navigate("/");
    }
  };
  const handleSearchChange = (event) => {
    setSearchItem(event.target.value);
    if (event.target.value) {
      navigate(`/?search=${event.target.value}`);
    } else {
      navigate("/");
    }
  };

 

  return (
    <Navbar collapseOnSelect expand="lg" className="MyNav">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="./images/logo.png" alt="logo1" className="imgLogo" />
        </Navbar.Brand>
        <Navbar.Brand as={Link} to="/">
          <h1>TheFork</h1>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Form className="d-flex location-form">
              <Form.Select size="sm" onChange={handleCityChange}>
                <option value="">Select City</option>
                {city.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </Form.Select>
            </Form>
            <Form className="d-flex search-form">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchItem}
                onChange={handleSearchChange}
              />
              <Button
                variant="outline-success"
                className="bg-body-tertiary"
                onClick={() => navigate(`/?search=${searchItem}`)}
              >
                Search
              </Button>
            </Form>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact us
            </Nav.Link>
            {isLoggedIn && userRole === "admin" && (
              <Nav.Link as={Link} to="/createRes">
                Create Restaurant
              </Nav.Link>
            )}

            {!isLoggedIn ? (
              <>
                {/* <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link> */}
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/bookings">
                  Bookings
                </Nav.Link>
                <Nav.Link as={Link} to="/transaction">
                  Transaction
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

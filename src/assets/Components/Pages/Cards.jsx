import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RestaurantContext } from "../../Context/Rescontext";
import axios from "axios";

export default function Cards() {
  const { restaurant } = useContext(RestaurantContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurant);
  const [isAdmin, setIsAdmin] = useState(false);
  const cardsPerPage = 6;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const cityName = queryParams.get("city");
    const ratingFilter = queryParams.get("rating");
    const cuisineFilter = queryParams.getAll("cuisine");
    const offerFilter = queryParams.getAll("offer");
    const searchItem = queryParams.get("search");

    let filtered = restaurant;

    if (cityName) {
      filtered = filtered.filter((rest) => rest.city === cityName);
    }

    if (ratingFilter) {
      const ratingValue = Number(ratingFilter);
      filtered = filtered.filter((rest) => {
        const upperLimit = ratingValue + 0.9;
        return rest.ratings >= ratingValue && rest.ratings <= upperLimit;
      });
    }

    if (cuisineFilter.length > 0) {
      filtered = filtered.filter((rest) =>
        rest.cuisines.some((cuisine) => cuisineFilter.includes(cuisine))
      );
    }

    if (offerFilter.length > 0) {
      filtered = filtered.filter((rest) =>
        offerFilter.includes(rest.buckets.toString())
      );
    }

    if (searchItem) {
      const lowerCaseSearchTerm = searchItem.toLowerCase();
      filtered = filtered.filter(
        (rest) =>
          rest.name.toLowerCase().startsWith(lowerCaseSearchTerm) ||
          rest.city.toLowerCase().startsWith(lowerCaseSearchTerm) ||
          rest.cuisines.some((cuisine) =>
            cuisine.toLowerCase().startsWith(lowerCaseSearchTerm)
          )
      );
    }

    setFilteredRestaurants(filtered);
  }, [restaurant, location.search]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const currentCards = filteredRestaurants.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAction = async (id, action, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (action === "view") {
      navigate(`/restaurant/${id}`);
    } else if (action === "edit") {
      navigate(`/edit-restaurant/${id}`);
    } else if (action === "delete") {
      try {
        await axios.delete(
          `https://restaurantappbackend-ssw6.onrender.com/restaurants/delete-restaurant/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setFilteredRestaurants(
          filteredRestaurants.filter((rest) => rest._id !== id)
        );
      } catch (error) {
        console.error("Error deleting restaurant:", error.message);
      }
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  return (
    <>
      <Container className="cardContainer">
        <Row>
          {currentCards.map((element, index) => {
            return (
              <Col xs={12} sm={6} md={4} lg={4} key={index} className="mb-4">
                <Card
                  style={{ width: "100%" }}
                  onClick={(event) => handleAction(element._id, "view", event)}
                >
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={element.image}
                      alt={`Card image ${index + 1}`}
                    />
                    <div
                      style={{
                        minWidth: "30px",
                        height: "25px",
                        borderRadius: "5px",
                        position: "absolute",
                        top: 10,
                        right: 15,
                        fontWeight: 900,
                        backgroundColor: "yellowgreen",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {element.ratings}
                    </div>
                  </div>

                  <Card.Body style={{backgroundColor:"lightgrey"}}>
                    <Card.Title>{element.name}</Card.Title>
                    <Card.Text>{element.address}</Card.Text>
                    <Card.Text>{element.city}</Card.Text>
                    <Card.Text>{element.cuisines.join(', ')}</Card.Text>
                    <Card.Text>{element.timing[0]}</Card.Text>
                    <Card.Text>{element.buckets} % OFF</Card.Text>
                    {isAdmin && (
                      <>
                        <div className="Deledit">
                        <Button
                          variant="danger"
                          onClick={(event) =>
                            handleAction(element._id, "delete", event)
                          }
                          className="button-spacing"
                        >
                          Delete
                        </Button>
                        <Button
                          variant="primary"
                          onClick={(event) =>
                            handleAction(element._id, "edit", event)
                          }
                        >
                          Edit
                        </Button>
                        </div>
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="outline-primary"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="me-2"
          >
            Previous
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastCard >= filteredRestaurants.length}
          >
            Next
          </Button>
        </div>
      </Container>
    </>
  );
}

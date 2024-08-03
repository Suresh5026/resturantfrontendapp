import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { RestaurantContext } from "../../Context/Rescontext";
import { useContext, useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

export default function Filter() {
  const { restaurant } = useContext(RestaurantContext);
    const [cities, setCities] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
      const uniqueCities = [...new Set(restaurant.map(rest => rest.city))];
      const uniqueCuisines = [...new Set(restaurant.flatMap(rest => rest.cuisines))];
      const uniqueOffers = [...new Set(restaurant.map(rest => rest.buckets))];
  
      setCities(uniqueCities);
      setCuisines(uniqueCuisines);
      setOffers(uniqueOffers);
    }, [restaurant]);

    const handleFilterChange = (type, value) => {
      const queryParams = new URLSearchParams(location.search);
  
      if (value) {
        queryParams.set(type, value);
      } else {
        queryParams.delete(type);
      }
      navigate(`?${queryParams.toString()}`);
    };

  return (
    
    <Accordion defaultActiveKey="">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Quick Filters</Accordion.Header>
        <Accordion.Body>
          {cities.map((city, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={city}
              onChange={(e) => handleFilterChange('city', e.target.checked ? city : '')}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Cuisines</Accordion.Header>
        <Accordion.Body>
          {cuisines.map((cuisine, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={cuisine}
              onChange={(e) => handleFilterChange('cuisine', e.target.checked ? cuisine : '')}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Offers</Accordion.Header>
        <Accordion.Body>
          {offers.map((offer, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={`${offer} % OFF`}
              onChange={(e) => handleFilterChange('offer', e.target.checked ? offer : '')}
            />
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

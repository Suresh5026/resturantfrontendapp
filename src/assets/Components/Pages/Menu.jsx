import Carousel from "react-bootstrap/Carousel";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function Menu() {
    const [rest, setRest] = useState([]);
    const {id} = useParams()
    useEffect(()=>{
        fetchRest();
      },[id])

      const fetchRest = async () =>{
        
        try{
          const response = await axios.get(
            `https://restaurantappbackend-ssw6.onrender.com/restaurants/get-restaurant/${id}`
          );
          const restData = response.data.data;
          console.log(restData);
          setRest(restData);
  
        }catch (error){
          console.log("Error fetching user data:", error);
        }
      }
  

  return (
    <Carousel data-bs-theme="dark">
      {rest && rest.menu && rest.menu.map((menuItem, menuIndex) => (
        <Carousel.Item key={`${rest.name}-${menuIndex}`}>
          <img
            className="d-block w-100"
            src={menuItem}
            alt={`Slide ${menuIndex + 1}`}
          />
          <Carousel.Caption>
            
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

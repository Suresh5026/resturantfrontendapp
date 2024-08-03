import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState([]);
  const [city, setCity] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "https://restaurantappbackend-ssw6.onrender.com/restaurants/get-restaurant"
        );
        const restData = response.data.data;
        setRestaurant(restData);

        const uniqueCities = [...new Set(restData.map((rest) => rest.city))];
        setCity(uniqueCities);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <RestaurantContext.Provider value={{ restaurant, city }}>
      {children}
    </RestaurantContext.Provider>
  );
};

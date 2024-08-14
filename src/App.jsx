import { Container, Row } from "react-bootstrap";
import Mynavbar from "./assets/Components/Mynavbar";
import { Routes, Route } from "react-router-dom";
import Home from "./assets/Components/Pages/Home";
import Bookings from "./assets/Components/Pages/Bookings";
import Contact from "./assets/Components/Pages/Contact";
import Signup from "./assets/Components/Pages/Signup";
import Login from "./assets/Components/Pages/Login";
import Cardsclick from "./assets/Components/Pages/Cardsclick";
import Createres from "./assets/Components/Pages/Createres";
import { RestaurantProvider } from "./assets/Context/Rescontext";
import EditRestaurant from "./assets/Components/Pages/Editrestaurant";


function App() {
  return (
    <>
     
        <RestaurantProvider>
          <Container>
            <Row>
              <Mynavbar />
            </Row>
            <Row>
              <Routes>
                <Route Component={Home} path="/" />
                <Route Component={Cardsclick} path="/restaurant/:id" />
                <Route Component={Bookings} path="/bookings" />
                <Route Component={Contact} path="/contact" />
                <Route Component={Signup} path="/signup" />
                <Route Component={Login} path="/login" />
                <Route Component={Createres} path="/createRes" />
                <Route Component={EditRestaurant} path="/edit-restaurant/:id" />
                
              </Routes>
            </Row>
          </Container>
        </RestaurantProvider>
      
    </>
  );
}

export default App;

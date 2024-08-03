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
import Transaction from "./assets/Components/Pages/Transaction";
import EditRestaurant from "./assets/Components/Pages/Editrestaurant";
import { AuthProvider } from "./assets/Context/Authcontext";

function App() {
  return (
    <>
      <AuthProvider>
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
                <Route Component={Transaction} path="/transaction" />
              </Routes>
            </Row>
          </Container>
        </RestaurantProvider>
      </AuthProvider>
    </>
  );
}

export default App;

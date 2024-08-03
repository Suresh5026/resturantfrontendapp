import { Row, Container, Col } from "react-bootstrap";
import Filter from "./Filter";
import Hotelsui from "./Hotelsui";
import Cards from "./Cards";

export default function Home() {
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col sm={3}>
            <Filter />
          </Col>
          <Col sm={9}>
            <Hotelsui />
            <Col className="mt-4">
                <Cards />
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
}

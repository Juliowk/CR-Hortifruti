import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Products_Grid_Component() {
  return (
    <Container className="mt-4">
      <Row xs={1} md={4} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/150/808080/808080.png"
              />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
              </Card.Body>
              <Card.Footer>Preço da semana: $00,00</Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products_Grid_Component;

import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface IProducts {
  _id: string;
  name: string;
  price: number;
}

interface IArrayProducts {
  products: IProducts[];
}

function Products_Grid_Component({ products }: IArrayProducts) {
  return (
    <Container className="mt-5 mb-5">
      <Row xs={1} md={4} className="g-4">
        {products.map((product) => (
          <Col key={product._id}>
            <Card>
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/150/808080/808080.png"
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
              </Card.Body>
              <Card.Footer>Preço da semana: ${product.price}</Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products_Grid_Component;

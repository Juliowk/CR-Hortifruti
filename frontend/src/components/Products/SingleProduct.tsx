import { Button, Card, Col } from "react-bootstrap";
import { SingleProductProps } from "./protocols";

const SingleProduct = ({ product }: SingleProductProps) => {
  return (
    <Col key={product._id}>
      <Card>
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/150/808080/808080.png"
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Button
            style={{ cursor: "default" }}
            variant="success"
            className="w-100"
          >
            Preço da semana: ${product.price}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleProduct;

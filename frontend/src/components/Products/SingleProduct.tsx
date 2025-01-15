import { Button, Card, Col } from "react-bootstrap";
import { SingleProductProps } from "./protocols";

const SingleProduct = ({ product }: SingleProductProps) => {
  return (
    <Col>
      <Card>
        <Card.Img
          variant="top"
          src={`/cards/${product.image}`}
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

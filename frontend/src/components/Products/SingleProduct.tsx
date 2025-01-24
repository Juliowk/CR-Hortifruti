import { Button, Card, Col, Row } from "react-bootstrap";
import { SingleProductProps } from "./protocols";

const SingleProduct = ({ product, userExpiredStatus }: SingleProductProps) => {
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={`/cards/${product.image}`} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Button
            style={{ cursor: "default" }}
            variant="success"
            className="w-100"
          >
            Preço da semana: ${product.price}
          </Button>
          {!userExpiredStatus && (
            <Row className="mt-3">
              <Col>
                <Button
                  style={{ cursor: "default" }}
                  variant="danger"
                  className="w-100"
                >
                  Delete
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleProduct;

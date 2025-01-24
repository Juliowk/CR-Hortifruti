import { Button, Card, Col, Row } from "react-bootstrap";
import { SingleProductProps } from "./protocols";
import { RiDeleteBin6Fill } from "react-icons/ri";

const SingleProduct = ({ product, userExpiredStatus }: SingleProductProps) => {
  const urlDelete = `${import.meta.env.VITE_URL_PRODUCTS_PROD}/${product._id}`;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token não informado");
      }
      
      const responseProducts = await fetch(urlDelete, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!responseProducts.ok) throw new Error(responseProducts.statusText);

      window.location.reload();
    } catch (error) {
      alert("Erro ao deletar o produto");
      console.error("Erro ao deletar o produto:", error);
    }
  };

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
                  onClick={handleSubmit}
                >
                  <RiDeleteBin6Fill size={30} />
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
import { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaCirclePlus } from "react-icons/fa6";
import { IProductsGridProps } from "./protocols";
import SingleProduct from "./SingleProduct";
import ModalBodyForm from "./ModalBodyForm";

const Products_Grid_Component = ({
  products,
  userExpiredStatus,
}: IProductsGridProps) => {
  const [modal, setModal] = useState(false);

  const modalOpenClose = () => {
    setModal(!modal);
  };

  return (
    <Container className="mt-5 mb-5">
      <Row xs={1} md={4} className="g-4">
        {products.map((product) => (
          <SingleProduct
            key={product._id}
            product={product}
            userExpiredStatus={userExpiredStatus}
          />
        ))}

        {!userExpiredStatus && (
          <Col onClick={modalOpenClose}>
            <Card className="d-flex justify-content-center align-items-center h-100 p-5">
              <Card.Text>
                <FaCirclePlus size={100} color="grey" />
              </Card.Text>
            </Card>
          </Col>
        )}
      </Row>
      <Modal show={modal} onHide={modalOpenClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModalBodyForm />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Products_Grid_Component;

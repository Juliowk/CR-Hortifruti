import React, { useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaCirclePlus } from "react-icons/fa6";

interface IProducts {
  _id: string;
  name: string;
  price: number;
}

interface IArrayProducts {
  products: IProducts[];
}

const Products_Grid_Component = ({ products }: IArrayProducts) => {
  const [modal, setModal] = useState(false);

  const [data, setData] = useState({
    name: "",
    price: 0,
  });

  const modalOpenClose = () => {
    setModal(!modal);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev,
      [id]: id === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url =
        import.meta.env.VITE_URL_GET_PRODUCTS_DEV ||
        import.meta.env.VITE_URL_GET_PRODUCTS_PROD;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Erro ao salvar o produto");

      window.location.reload();
    } catch (error) {
      console.log(`Erro ao salvar o produto: ${error}`);
      alert("Erro ao salvar o produto");
    }
  };

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
        <Col onClick={modalOpenClose}>
          <Card>
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/150x204/808080/808080.png"
            />
            <Card.ImgOverlay className="d-flex justify-content-center align-items-center">
              <Card.Text>
                <FaCirclePlus size={100} color="white" />
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
      <Modal
        show={modal}
        onHide={modalOpenClose}
        animation={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Label htmlFor="name">Nome:</Form.Label>
                <Form.Control
                  id="name"
                  placeholder="Digite um nome para o produto:"
                  type="text"
                  value={data.name}
                  onChange={handleChange}
                />
              </Col>

              <Col>
                <Form.Label htmlFor="price">Preço:</Form.Label>
                <Form.Control
                  id="price"
                  placeholder="Defina o preço:"
                  min="0"
                  step="0.01"
                  type="number"
                  value={data.price}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Button type="submit" className="w-100" variant="secondary">
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Products_Grid_Component;

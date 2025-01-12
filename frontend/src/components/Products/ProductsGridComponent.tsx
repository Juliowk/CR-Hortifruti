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
    file: null as File | null,
  });

  const modalOpenClose = () => {
    setModal(!modal);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;

    setData((prev) => ({
      ...prev,
      [id === "file" ? "file" : id]:
        id === "price"
          ? parseFloat(value)
          : id === "file"
          ? files && files[0]
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const urlUploads =
        import.meta.env.VITE_URL_GET_UPLOADS_DEV ||
        import.meta.env.VITE_URL_GET_UPLOADS_PROD;

      const urlProducts =
        import.meta.env.VITE_URL_GET_PRODUCTS_DEV ||
        import.meta.env.VITE_URL_GET_PRODUCTS_PROD;

      const formData = new FormData();

      if (!data.file) throw new Error("Arquivo não informado");

      formData.append("file", data.file);

      const responseImg = await fetch(urlUploads, {
        method: "POST",
        body: formData,
      });

      if (!responseImg.ok) throw new Error("Erro ao salvar imagem");

      const awaitFileName = await responseImg.json();

      const responseProducts = await fetch(urlProducts, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          fileName: awaitFileName,
        }),
      });

      if (!responseProducts.ok) throw new Error("Erro ao salvar o produto");

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
        ))}
        <Col onClick={modalOpenClose}>
          <Card className="d-flex justify-content-center align-items-center h-100 p-5">
            <Card.Text>
              <FaCirclePlus size={100} color="grey" />
            </Card.Text>
          </Card>
        </Col>
      </Row>
      <Modal show={modal} onHide={modalOpenClose} centered size="lg">
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
                <Form.Label>Imagem do produto:</Form.Label>
                <Form.Control
                  id="file"
                  placeholder="Escolha uma imagem"
                  type="file"
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

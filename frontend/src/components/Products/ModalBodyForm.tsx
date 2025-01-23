import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ModalBodyForm = () => {
  const urlProducts =
    import.meta.env.VITE_URL_GET_PRODUCTS_DEV ||
    import.meta.env.VITE_URL_GET_PRODUCTS_PROD;

  if (!urlProducts) throw new Error("Unreported variables");

  const [data, setData] = useState({
    name: "",
    price: 0,
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { id, value } = e.target as HTMLInputElement | HTMLSelectElement;

    setData((prev) => ({
      ...prev,
      [id]: id === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token não informado");
      }
      
      const responseProducts = await fetch(urlProducts, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          image: data.image,
        }),
      });

      if (!responseProducts.ok) throw new Error(responseProducts.statusText);

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
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
        <Col>
          <Form.Label htmlFor="imagemSelect">Imagem:</Form.Label>
          <Form.Select id="image" value={data.image} onChange={handleChange}>
            <option value="">Selecione uma imagem</option>
            <option value="Batata-card.png">Batata</option>
            <option value="Cenoura-card.png">Cenoura</option>
          </Form.Select>
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
  );
};

export default ModalBodyForm;

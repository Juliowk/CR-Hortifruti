import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ModalBodyForm = () => {
  const urlUploads =
    import.meta.env.VITE_URL_GET_UPLOADS_DEV ||
    import.meta.env.VITE_URL_GET_UPLOADS_PROD;

  const urlProducts =
    import.meta.env.VITE_URL_GET_PRODUCTS_DEV ||
    import.meta.env.VITE_URL_GET_PRODUCTS_PROD;

  if (!urlProducts || !urlUploads) throw new Error("Unreported variables");

  const [data, setData] = useState({
    name: "",
    price: 0,
    file: null as File | null,
  });

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
      console.log(error);
      alert("Erro ao salvar o produto");
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
  );
};

export default ModalBodyForm;

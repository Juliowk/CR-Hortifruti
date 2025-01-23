import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const LoginForm = () => {
  const urlLogin = import.meta.env.VITE_URL_LOGIN_PROD;

  if (!urlLogin) throw new Error("Unreported variables");

  const [data, setData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { id, value } = e.target as HTMLInputElement;

    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(urlLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const token = await response.text();
      localStorage.setItem("token", token);

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Erro ao fazer login: " + error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Label htmlFor="name">Nome:</Form.Label>
          <Form.Control
            id="name"
            placeholder="Digite o nome de usuário:"
            type="text"
            value={data.name}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Form.Label htmlFor="password">Senha:</Form.Label>
          <Form.Control
            id="password"
            placeholder="Digite a senha:"
            type="password"
            value={data.password}
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

export default LoginForm;

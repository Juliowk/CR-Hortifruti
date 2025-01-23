import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const LoginForm = () => {
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
      const urlLogin = import.meta.env.VITE_URL_LOGIN_PROD;

      if (!urlLogin) throw new Error("Unreported variables");

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
        
        if (response.status === 400) {
          const responseText = await response.text();
          const errors: { [key: string]: string[] } = JSON.parse(responseText);

          let errorMessage: string = "Por favor, corrija os seguintes erros:\n";

          for (const [field, messages] of Object.entries(errors)) {
            errorMessage += `${
              field.charAt(0).toUpperCase() + field.slice(1)
            }:\n`;
            messages.forEach((message: string) => {
              errorMessage += `- ${message}\n`;
            });

            throw new Error(errorMessage);
          }
        }

        if (response.status === 401) {
          throw new Error("Senha ou nome incorretos!");
        }
      }

      const token = await response.text();
      const cleanedToken = token.replace(/^"|"$/g, "");

      localStorage.setItem("token", cleanedToken);

      window.location.reload();
    } catch (error) {
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

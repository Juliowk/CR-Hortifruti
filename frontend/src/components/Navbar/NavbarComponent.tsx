import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import logo from "../../images/3-removebg-preview.png";
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { MdOutlineSearch } from "react-icons/md";

function Navbar_Component() {
  const [isCollapse, setIsCollapse] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 576) {
      setIsCollapse(true);
    } else {
      setIsCollapse(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Navbar key={"sm"} expand={"sm"} className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <img
            alt="Logo image"
            src={logo}
            width="70"
            height="70"
            className="d-inline-block align-top"
          />{" "}
        </Navbar.Brand>

        <Navbar.Brand className={styles.navbarBrandText}>
          CR HORTIFRUTI
        </Navbar.Brand>

        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />

        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-sm`}
          aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
              Links
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form
              className={`d-flex ${isCollapse ? null : "w-100"}`}
              style={{
                marginLeft: !isCollapse ? "2rem" : undefined,
                marginRight: !isCollapse ? "2rem" : undefined,
              }}
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-secondary">
                <MdOutlineSearch size={30} />
              </Button>
            </Form>

            <Nav className={`justify-content-end flex-grow-1 pe-3`}>
              <Nav.Link href="#" className={isCollapse ? "mb-3 mt-3" : ""}>
                <FaWhatsapp size={30} /> {isCollapse && "Whatsapp"}
              </Nav.Link>
              <Nav.Link href="#" className={isCollapse ? "mb-3" : ""}>
                <FaGithub size={29} /> {isCollapse && "GitHub"}
              </Nav.Link>
              <Nav.Link href="#" className={isCollapse ? "mb-3" : ""}>
                <LuLogIn size={29} /> {isCollapse && "Login"}
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Navbar_Component;

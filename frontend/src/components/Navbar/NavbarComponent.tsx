import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import logo from "../../images/3-removebg-preview.png";
import styles from "./navbar.module.css";
import { useEffect, useState } from "react";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";
import { CgLogOut } from "react-icons/cg";

interface INavbarProps {
  userExpiredStatus: boolean;
}

function Navbar_Component({ userExpiredStatus }: INavbarProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

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

  const logoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    window.location.reload();
  };

  return (
    <Navbar key={"sm"} expand={"sm"} className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
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
            <Modal show={show} onHide={handleClick} centered size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Formulario de Login</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <LoginForm />
              </Modal.Body>
            </Modal>

            <Nav className={`justify-content-end flex-grow-1 pe-3`}>
              <Nav.Link
                target="_blank"
                href={`https://wa.me/55${
                  import.meta.env.VITE_URL_NUMBER_PHONE
                }?text=${import.meta.env.VITE_URL_MESSAGE_PHONE}`}
                className={isCollapse ? "mb-3 mt-3" : ""}
              >
                <FaWhatsapp size={30} /> {isCollapse && "Whatsapp"}
              </Nav.Link>
              <Nav.Link
                target="_blank"
                href="https://github.com/Juliowk"
                className={isCollapse ? "mb-3" : ""}
              >
                <FaGithub size={29} /> {isCollapse && "GitHub"}
              </Nav.Link>
              {userExpiredStatus ? (
                <Nav.Link
                  href=""
                  className={isCollapse ? "mb-3" : ""}
                  onClick={handleClick}
                >
                  <LuLogIn size={29} /> {isCollapse && "Login"}
                </Nav.Link>
              ) : (
                <Nav.Link
                  href=""
                  className={isCollapse ? "mb-3" : ""}
                  onClick={logoutClick}
                >
                  <CgLogOut size={32} /> {isCollapse && "Logout"}
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Navbar_Component;

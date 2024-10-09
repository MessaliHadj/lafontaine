import { useState } from "react";
import { Link } from "react-router-dom";
import "@/styles/HeaderStyle.css";
import {Container,Navbar, Nav, Badge } from 'react-bootstrap';
import Logo from "@/assets/logo.png";

const Header = () => {
  const [nav, setNav] = useState(false);

  const changeValueOnScroll = () => {
    const scrollValue = document?.documentElement?.scrollTop;
    scrollValue > 200 ? setNav(true) : setNav(false);
  }

  window.addEventListener("scroll", changeValueOnScroll)

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className={`${nav && "sticky"}`} >
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo">
            <img src={Logo} alt="logo de la Font'n" className="img-fluid" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Accueil</Nav.Link>
              <Nav.Link as={Link} to="/menu">La Carte</Nav.Link>
              <Nav.Link as={Link} to="/shop">La Boutique</Nav.Link>
              <Nav.Link as={Link} to="/about">À Propos</Nav.Link>
              <Nav.Link as={Link} to="/contact">Nous Contacter</Nav.Link>
              <Nav.Link as={Link} to="/blog">Le Blog</Nav.Link>
              <Nav.Link as={Link} to="/cart">
                <div className="cart">
                  <i className="bi bi-bag"></i>
                  <Badge pill bg="success" className="roundpoint">2</Badge>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@/styles/HeaderStyle.css";
import {Container,Navbar, Nav, Badge } from 'react-bootstrap';
import Logo from "@/assets/logo.png";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [open, setOpen] = useState(false);
  const [prod, setProd] = useState(0);

  useEffect(() => {
    let prevScrollPos = window.scrollY;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 200);
      setShowScrollToTop(scrollTop < 825 || prevScrollPos > scrollTop);
      prevScrollPos = prevScrollPos = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className = `navbar ${isSticky ? 'sticky' : ''} ${showScrollToTop ? 'active' : ''}`;

  return (
    <header>
      <Navbar collapseOnSelect fixed="top" expand="lg" className={className} >
        <Container>
          <Navbar.Brand onClick={() => setOpen(!open)} as={Link} to="/" className="logo">
            <img src={Logo} alt="logo de la Font'n" className="img-fluid" />
          </Navbar.Brand>
          <Navbar.Toggle onClick={() => setOpen(!open)} aria-controls="navbarScroll" aria-expanded={open} />
          <Navbar.Collapse in={open} id="navbarScroll">
            <Nav className="ms-auto" navbarScroll>
              <Nav.Link onClick={() => setOpen(!open)} as={Link} to="/">Accueil</Nav.Link>
              <Nav.Link onClick={() => setOpen(!open)} as={Link} to="/menu">La Carte</Nav.Link>
              <Nav.Link onClick={() => setOpen(!open)} as={Link} to="/contact">Nous Contacter</Nav.Link>
              <Nav.Link onClick={() => setOpen(!open)} as={Link} to="/about">À Propos</Nav.Link>
              <Nav.Link onClick={() => setOpen(!open)} as={Link} to="/cart">
                <div className="cart">
                  <i className="bi bi-bag"></i>
                  <Badge pill bg="success" className={`roundpoint ${prod > 9 ? 'sup' : ''}`} >{prod}</Badge>
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
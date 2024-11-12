import { useState, useEffect, useContext } from "react";
import {Container,Navbar, Nav, Badge } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import { UserContext } from "@/components/Contexts/UserContext";
import "@/styles/HeaderStyle.css";
import Logo from "@/assets/logo.png";

const Header = () => {
  const { user } = useContext(UserContext);
  const [isSticky, setIsSticky] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [open, setOpen] = useState(false);
  const [prodCount, setProdCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    let prevScrollPos = window.scrollY;
    let stickyValue = 200;
    let showValue = 825;
  
    if (location.pathname === '/auth') {
      stickyValue = 0;
      showValue = 0;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > stickyValue);
      setShowScrollToTop(scrollTop < showValue || prevScrollPos > scrollTop);
      prevScrollPos = prevScrollPos = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const className = `navbar ${isSticky ? 'sticky' : ''} ${showScrollToTop ? 'active' : ''}`;

  return (
    <header>
      <Navbar collapseOnSelect fixed="top" expand="lg" className={className} >
        <Container>
          <Navbar.Brand onClick={() => setOpen(!open)} as={Link} to="/" className="logo">
            <img src={Logo} alt="logo de la Font'n" className="img-fluid" />
          </Navbar.Brand>
          {user && (
            <Link to="/account" aria-label="Mon profil" className="profilBx text-center">
              <div className="profil mx-auto">
                <img src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${user?.phone_number}`} alt="avatar" />
              </div>
              <p>{user.firstname}</p>
            </Link>
          )}
          <Navbar.Toggle onClick={() => setOpen(!open)} aria-controls="navbarScroll" aria-expanded={open} />
          <Navbar.Collapse in={open} id="navbarScroll">
            <Nav className="ms-auto" navbarScroll>
              <Nav.Link onClick={() => setOpen(!open)} as={Link} to="/">Accueil</Nav.Link>
              <Nav.Link onClick={() => setOpen(!open)} as={Link} to="/menu">La Carte</Nav.Link>
              <Nav.Link onClick={() => setOpen(!open)} as={Link} to="/contact">Nous Contacter</Nav.Link>
              <Nav.Link onClick={() => setOpen(!open)} as={Link} to="/about">À Propos</Nav.Link>
              {
                user ? 
                (
                  <Nav.Link onClick={() => setOpen(!open)} as={Link} to="/cart">
                    <div className="cart">
                      <i className="bi bi-bag"></i>
                      <Badge pill bg="success" className={`roundpoint ${prodCount > 9 ? 'sup' : ''}`} >{prodCount}</Badge>
                    </div>
                  </Nav.Link>
                ) : 
                (
                  <Nav.Link onClick={() => setOpen(!open)} as={Link} to="/auth" aria-label="Se connecter ou s'inscrire">
                    <div className="user">
                      <i className="bi bi-person"></i>
                    </div>
                  </Nav.Link>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
import { Link } from "react-router-dom";
// import { faFacebook, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
// import { faEnvelope, faGem, faHome, faPhone } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import EmailInput from "../Input/EmailInput";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted">
      <div className="text-center p-4" style={{backgroundColor:"rgba(0, 0, 0, 0.05)"}}>
        © {new Date().getFullYear()} Copyright: &nbsp;
        <Link className="text-reset fw-bold" href="https://www.lafontn.fr">lafontn.fr</Link>
      </div>
    </footer>
  );
};

export default Footer;
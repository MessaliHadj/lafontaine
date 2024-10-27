import { Link } from "react-router-dom";
import "@/styles/FooterStyle.css";
import { Container, Row, Col } from 'react-bootstrap'
import Tiktok from '@/assets/tiktok.png'
import Instagram from '@/assets/instagram.png'
import Youtube from '@/assets/youtube.png'

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted pt-5">
      <section>
        <Container>
          <Row>
            <Col className="d-flex justify-content- flex-wrap text-center">
              <div className="mb-4 col-xl-3 col-lg-4 col-sm-6 mx-auto mb-md-0 mb-4">
                <h3 className="text-uppercase fw-bold mb-4">Adresse</h3>
                <address>
                  <a href="https://www.google.com/maps/place/12+Rue+Max+Ernst,+33270+Floirac/@44.8417899,-0.5232299,17z/data=!3m1!4b1!4m6!3m5!1s0xd5525fb7b3abe27:0xb0878e4201f6bff6!8m2!3d44.8417861!4d-0.520655!16s%2Fg%2F11c22ycq_n?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D" className="text-reset link-underline link-underline-opacity-0" target="_blank">
                    <i className="bi bi-geo-alt"></i> 3 Place Max Ernst<br/> 33270 FLOIRAC,<br/> Nouvelle Aquitaine, FR
                  </a>
                </address>
              </div>
              <div className="mb-4 col-xl-3 col-lg-4 col-sm-6 mx-auto mb-4">
                <h3 className="text-uppercase fw-bold mb-4">
                  Commander
                </h3>
                <p className="calling_sup_text">Commander via WhatsApp</p>
                <address>
                  <a href="whatsapp://send?phone=+33633270270" className="calling link-underline link-underline-opacity-0">
                  <i className="bi bi-telephone"></i> 06 33 270 270
                  </a>
                </address>
              </div>
              <div className="mb-4 col-xl-3 col-lg-4 col-sm-6 col-12 mx-auto mb-4">
                <h3 className="text-uppercase fw-bold mb-4">
                  horaires d'ouverture
                </h3>
                <p>
                  lun-ven: 8.00 - 15.00 & 18.00 - 00.00<br/>
                  week-end: 9.00 - 1.00
                </p>
              </div>
              <div className="mb-4 col-xl-3 col-lg-4 col-sm-6 col-12 mx-auto mb-4">
                <h3 className="text-uppercase fw-bold mb-4">
                  suivez nous
                </h3>
                <span>
                  <Link to="/" aria-label="tiktok" className="mx-3">
                    <img src={Tiktok} alt="logo de TikTok" />
                  </Link>
                  <Link to="/" aria-label="instagram" className="mx-3">
                    <img src={Instagram} alt="logo d'instagram" />
                  </Link>
                  <Link to="/" aria-label="youtube" className="mx-3">
                    <img src={Youtube} alt="logo de YouTube" />
                  </Link>
                </span>
              </div>            
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <div className="text-center p-4" style={{backgroundColor:"rgba(0, 0, 0, 0.05)"}}>
          © {new Date().getFullYear()} Copyright: &nbsp;
          <Link className="text-reset fw-bold" href="https://www.lafontn.fr">lafontn.fr</Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
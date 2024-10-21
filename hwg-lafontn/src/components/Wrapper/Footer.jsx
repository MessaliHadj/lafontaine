import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-light text-muted pt-5">
      <section>
        <Container>
          <Row>
            <Col className="d-flex justify-content- flex-wrap text-center">
              <div className="mb-4 col-xl-3 col-lg-4 col-sm-6 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Adresse</h6>
                <address>
                  <a href="https://www.google.com/maps/place/12+Rue+Max+Ernst,+33270+Floirac/@44.8417899,-0.5232299,17z/data=!3m1!4b1!4m6!3m5!1s0xd5525fb7b3abe27:0xb0878e4201f6bff6!8m2!3d44.8417861!4d-0.520655!16s%2Fg%2F11c22ycq_n?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D" className="text-reset link-underline link-underline-opacity-0" target="_blank">
                    <i class="bi bi-geo-alt"></i> 3 Place Max Ernst<br/> 33270 FLOIRAC,<br/> Nouvelle Aquitaine, FR
                  </a>
                </address>
              </div>
              <div className="mb-4 col-xl-3 col-lg-4 col-sm-6 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Commander
                </h6>
                <p>Commander via WhatsApp</p>
                <address>
                  <a href="whatsapp://send?phone=+33633270270" className="text-reset link-underline link-underline-opacity-0">
                  <i class="bi bi-telephone"></i> 06 33 270 270
                  </a>
                </address>
              </div>
              <div className="mb-4 col-xl-3 col-lg-4 col-sm-6 col-12 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  horaires d'ouverture
                </h6>
                <p>
                  lun-ven: 8.00 - 15.00 & 18.00 - 00.00<br/>
                  week-end: 9.00 - 1.00
                </p>
              </div>
              <div className="mb-4 col-xl-3 col-lg-4 col-sm-6 col-12 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  suivez nous
                </h6>
                <p>
                  <Link href="#!" className="text-reset mx-2"><i class="bi bi-tiktok"></i></Link>
                  <Link href="#!" className="text-reset mx-2"><i class="bi bi-instagram"></i></Link>
                  <Link href="#!" className="text-reset mx-2"><i class="bi bi-youtube"></i></Link>
                </p>
              </div>            
            </Col>
          </Row>
        </Container>
        {/* <div className="d-flex justify-content-center text-center text-lg-start col-12">
          <div className="row col-12">
            <div className="col-7 col-lg-2 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Adresse</h6>
              <address>
                <a href="https://www.google.com/maps/place/12+Rue+Max+Ernst,+33270+Floirac/@44.8417899,-0.5232299,17z/data=!3m1!4b1!4m6!3m5!1s0xd5525fb7b3abe27:0xb0878e4201f6bff6!8m2!3d44.8417861!4d-0.520655!16s%2Fg%2F11c22ycq_n?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D" className="text-reset link-underline link-underline-opacity-0" target="_blank">
                  <i class="bi bi-geo-alt"></i> 3 Place Max Ernst<br/> 33270 FLOIRAC,<br/> Nouvelle Aquitaine, FR
                </a>
              </address>
              <address>
                <a href="tel:+33633270270" className="text-reset link-underline link-underline-opacity-0">
                <i class="bi bi-telephone"></i> 06 33 270 270
                </a>
              </address>
            </div>
            <div className="col-5 col-lg-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Nos Produits
              </h6>
              <p>
                <Link href="#!" className="text-reset">Angular</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">React</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">Vue</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">Laravel</Link>
              </p>
            </div>
            <div className="col-5 col-lg-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
              LIENS UTILES
              </h6>
              <p>
                <Link href="#!" className="text-reset">Pricing</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">Settings</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">Orders</Link>
              </p>
              <p>
                <Link href="#!" className="text-reset">Help</Link>
              </p>
            </div>
          </div>
        </div> */}
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
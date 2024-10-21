import { Container, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom"
import AppImg from "@/assets/e-shop.png"
import GooglePlay from "@/assets/googleplay.png"
import AppStore from "@/assets/appstore.png"
import Deliveroo from "@/assets/deliveroo.png"
import JustEat from "@/assets/justeat.png"
import UberEats from "@/assets/ubereats.png"
import TooGoodToGo from "@/assets/TooGoodToGo.png"

const Section5 = () => {
  return (
    <>
      <section className='shop_section'>
        <Container>
          <Row className='align-items-center'>
            <Col lg={6} className='text-center text-lg-start mb-5 mb-lg-0' >
              <h2>Téléchargez l'app mobile et</h2>
              <h3>économisez 15%</h3>
              <p>Profitez de 15% de réduction sur votre première commande via notre application mobile ! Commandez dès maintenant et savourez nos burgers de qualité directement chez vous.*</p>
              <Link to='/'>
                <img src={AppStore} alt="IOS" className='img-fluid me-3 store'/>
              </Link>
              <Link to='/'>
                <img src={GooglePlay} alt="IOS" className='img-fluid me-3 store'/>
              </Link>
              <p className='conditions'>*Conditions de l'offre : Valable une seule fois par client et par adresse. Non cumulable avec d'autres promotions en cours. Valable uniquement sur la première commande. Zone de livraison limitée.</p>
            </Col>
            <Col lg={6} className='e_shop'>
              <img src={AppImg} alt="e-shop" className='img-fluid' />
            </Col>
          </Row>
        </Container>
      </section>
      <section className='brand_section'>
        <Container>
          <Row className='justify-content-between'>
            <Col className='mb-4 col-xl-3 col-lg-4 col-sm-6 mt-2 text-center brand_img'>
              <img src={UberEats} alt="UberEats" className='img-fluid ratio ratio-1x1' />
            </Col>
            <Col className='mb-4 col-xl-3 col-lg-4 col-sm-6 mt-2 text-center brand_img'>
              <img src={Deliveroo} alt="Deliveroo" className='img-fluid ratio ratio-1x1' />
            </Col>
            <Col className='mb-4 col-xl-3 col-lg-4 col-sm-6 mt-2 text-center brand_img'>
              <img src={JustEat} alt="JustEat" className='img-fluid ratio ratio-1x1' />
            </Col>
            <Col className='mb-4 col-xl-3 col-lg-4 col-sm-6 mt-2 text-center brand_img'>
              <img src={TooGoodToGo} alt="TooGoodToGo" className='img-fluid ratio ratio-1x1' />
            </Col>
          </Row>
        </Container>
      </section>  
    </>
  )
}

export default Section5
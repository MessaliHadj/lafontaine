import Croger from '@/assets/croger.png'
import CrogerLarge from '@/assets/croger-large.png'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Section1 = () => {
  return (
    <section className="hero_section">
      <Container>
        <Row>
          <Col lg={7} className="mb-5 mb-lg-0">
            <div className="position-relative">
              <img src={Croger} 
              srcSet={`${CrogerLarge} 1200w`}
              className="img-fluid img_croger" 
              alt="image du croger" />
              <div className="price_badge">
                <div className="badge_text">
                  <h4 className="h4-xs">Seulement</h4>
                  <h4 className="h3-lg">9.90€</h4>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={5}>
            <div className="hero_text text-center">
              <h1 className="text-white">Le Croger</h1>
              <h2 className="text-white">Bourguignon</h2>
              <p className='text-white pt-2 pb-4'>
              Un pain croissant croustillant et beurré, garni de bœuf bourguignon tendre et savoureux. Des pickles pour une note de fraîcheur et de croquant. Le tout est sublimé par une combinaison de fromage Comté et cheddar, fondants et gourmands.
              </p>
              <p className='text-white pt-2 pb-4'>
              Un véritable délice pour les amateurs de burgers et de cuisine française! 🍔🇫🇷
              </p>
              <Link to="/" className="btn order_now" >Commander</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Section1
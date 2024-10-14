import { Container, Row, Col } from 'react-bootstrap'
import PromotionImage from '@/assets/pro.png'

const Section4 = () => {
  return (
    <>
      <section className='promotion_section'>
        <Container>
          <Row className='align-items-center'>
            <Col lg={6} className='text-center mb-5 mb-lg-0' >
              <img src={PromotionImage} alt="Promotion" className='img-fluid' />
            </Col>
            <Col lg={6} className='px-5' >
              <h2>Rien ne rapproche les gens comme un bon burger.</h2>
              <p>Un bon burger a ce pouvoir unique de rassembler, de créer des moments de partage et de convivialité autour d'une table. À La Font'n, nous croyons que chaques bouchée doit être une expérience inoubliable, mêlant saveurs authentiques et qualité irréprochable. Nos burgers sont pensés pour être bien plus qu'un simple repas : </p>
              <ul>
                <li>Ils sont une invitation à savourer des instants de bonheur, ensemble.</li>
                <li>Ils sont conçu pour offrir un moment de plaisir gourmand et de partage.</li>
                <li>Ils réunissent des ingrédients de qualité, créant des souvenirs gustatifs à chaque bouchée.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="bg_parallax_scroll"></section>
    </>
  )
}

export default Section4
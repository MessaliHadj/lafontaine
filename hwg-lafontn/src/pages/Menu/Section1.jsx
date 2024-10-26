import { Container, Row, Col } from 'react-bootstrap'

const Section1 = () => {
  return (
    <section className="hero_section">
      <Container>
        <Row>
          <Col lg={{span:8, offset:2}} className="hero_text text-center">
            <h1 className="text-white">tous nos produits</h1>
            <h2 className="text-white">à la carte !</h2>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Section1
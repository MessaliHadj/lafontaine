import { Container, Row, Col } from 'react-bootstrap'

const Section7 = () => {
  return (
    <section className='contact_section'>
      <Container>
        <Row className='justify-content-center py-5'>
          <Col sm={8} className='text-center' >
            <h2>Nous vous assurons</h2>
            <h3>une commande prête en moins de 10 minutes!</h3>
            <p>Envie d'un burger ? Pas de problème ! Commandez et récupérez votre burger préféré en moins de 10 minutes. Nous préparons tout à la minute pour vous garantir un maximum de saveur. Un service rapide et efficace pour satisfaire toutes vos envies.</p>
            <address className='btn btn-red px-4 py-2 rounded-0'>
              <a href="https://wa.me/33759584601" target="_blank" className="text-reset link-underline link-underline-opacity-0">
                <i className="bi bi-telephone">&#x202F; &#x202F; 07 59 58 46 01</i>
              </a>
            </address>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Section7
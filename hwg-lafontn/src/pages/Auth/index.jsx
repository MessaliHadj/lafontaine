import { Container, Row, Col } from 'react-bootstrap'
import "@/styles/AuthStyle.css";
import ScrollToTop from "@/components/Handler/ScrollToTop";
import Signin from "./Signin";
import Signup from "./Signup";

const index = () => {
  return (
    <>
      <ScrollToTop/>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg={{span:8, offset:2}} className="hero_text ">
              <Signin/>
            </Col>
            {/* <Col lg={6} className="hero_text text-center">
              <Signin/>
            </Col> */}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default index
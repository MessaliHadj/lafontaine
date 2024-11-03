import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import "@/styles/AuthStyle.css";
import ScrollToTop from "@/components/Handler/ScrollToTop";
import Signin from "./Signin";
import Signup from "./Signup";

const index = () => {

  const [toggleForm, setToggleForm] = useState(false)

  const addToggler = e => {
    e.preventDefault(); 
    setToggleForm(!toggleForm)
  }

  useEffect(()=>{
    if (!toggleForm) {
      const timer = setTimeout(() => {
        window.scrollTo({ top: 140, behavior: 'smooth' });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [toggleForm])

  return (
    <>
      <ScrollToTop/>
      <section className="hero_section">
        <Container>
            <Row className='justify-content-center'>
              <div className={`auth overflow-hidden position-relative p-0 ${toggleForm && "active"}`} style={{ width: '800px' }}>
                <Col lg={12} className="hero_text sign signinBx position-absolute top-0 start-0 p-0 d-flex">
                  <Signin addToggler={addToggler}/>
                </Col>
                <Col lg={12} className="hero_text sign signupBx position-absolute top-0 start-0 p-0 d-flex flex-row-reverse">
                  <Signup addToggler={addToggler}/>
                </Col>
              </div>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default index
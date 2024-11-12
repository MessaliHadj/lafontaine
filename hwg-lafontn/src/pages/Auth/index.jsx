import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "@/styles/AuthStyle.css";
import { UserContext } from '@/components/Contexts/UserContext';
import ScrollToTop from "@/components/Handler/ScrollToTop";
import Signin from "./Login";
import Signup from "./Signup";

const index = () => {

  const [toggleForm, setToggleForm] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const addToggler = e => {
    e.preventDefault(); 
    setToggleForm(!toggleForm)
  }

  useEffect(() => {
    user && navigate('/');
  }, [user, navigate]);

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
        <Container className='px-5 px-sm-0'>
            <Row className='justify-content-center'>
              <div className={`auth overflow-hidden position-relative p-0 ${toggleForm && "active"}`} style={{ width: '800px' }}>
                <Col xs={12} className="hero_text sign signinBx position-absolute top-0 start-0 p-0 d-flex">
                  <Signin addToggler={addToggler}/>
                </Col>
                <Col xs={12} className="hero_text sign signupBx position-absolute top-0 start-0 p-0 d-flex flex-row-reverse">
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
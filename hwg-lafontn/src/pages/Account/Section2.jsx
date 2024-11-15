import { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { UserContext } from '@/components/Contexts/UserContext';
import useCookie from "@/components/CustomHook/useCookie";

const Section2 = () => {

  const { removeCookie } = useCookie('token');
  const { setUser } = useContext(UserContext);

  const disconnect = () => {
    removeCookie();
    setUser();
  }

  return (
    <section>
      <Container>
        <Row className='justify-content-center py-5'>
          <Col sm={8} className='text-center' >
            <p onClick={disconnect} className='btn btn-red'>Se déconnecter.</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Section2
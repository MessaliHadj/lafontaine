import { Form, Button, Row, Col } from 'react-bootstrap';
import useFormValidation from '@/components/CustomHook/useFormValidation';
import SignupImg from '@/assets/signup.webp'
import SignupLargeImg from '@/assets/signup-large.webp'

const Signup = ({addToggler}) => {

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    phone_number: '',
    password: '',
    verifPassword: ''
  };

  const {
    inputValue,
    disabled,
    handleChange,
    step,
    setStep
  } = useFormValidation(initialValues, 'signup');

  return (
    <>
      <div className="imgBx d-none d-md-block position-relative w-50">
        <img 
        src={SignupImg} 
        srcSet={`${SignupLargeImg} 1200w`} 
        className="position-absolute start-0 w-100 h-100"
        alt="Signin Image" 
        />
      </div>
      <Col className='formBx position-relative w-50 w-md-100 h-100'>
        <Form className="position-absolute start-0 w-100 h-100 px-4">
          <h2 className="mt-3 text-center">S'inscrire</h2>
          {step === 1 && (
            <>
              <Row className="mb-3">
                <Form.Group as={Col} xs={12} sm={6} controlId="formBasicFirstname">
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstname"
                    value={inputValue.firstname}
                    onChange={handleChange}
                    placeholder="ex: Jean"
                    required
                    />
                </Form.Group>
                <Form.Group as={Col} xs={12} sm={6} controlId="formBasicLastname">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastname"
                    value={inputValue.lastname}
                    onChange={handleChange}
                    placeholder="ex: De Lafontaine"
                    required
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formBasicTel">
                <Form.Label>Num de téléphone</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone_number"
                  value={inputValue.phone_number}
                  onChange={handleChange}
                  placeholder="ex: 0633270270 ou +33633270270"
                  required
                />
              </Form.Group>
              <Button 
              variant="primary" 
              type="submit" 
              className="btn"
              onClick={()=>setStep(2)} 
              disabled={disabled}
              >
                Suivant <i className="bi bi-caret-right-fill"></i>
              </Button>
              <span className="ms-3">ou</span>
              <Button type="button" onClick={(e) => addToggler(e)} className="ms-3 my-0 btn switch_auth">
                Se connecter
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <Form.Group className="my-5" controlId="formBasicEmail">
                <Form.Label>Adresse email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={inputValue.email}
                  onChange={handleChange}
                  placeholder="ex: exemple@lafontn.fr"
                  required
                />
              </Form.Group>
              <Button 
              variant="primary" 
              type="submit" 
              className="btn"
              onClick={()=>setStep(1)} 
              >
                <i className="bi bi-caret-left-fill"></i> Precedent
              </Button>
              <Button 
              variant="primary" 
              type="submit" 
              className="btn ms-2"
              onClick={()=>setStep(3)} 
              disabled={disabled}
              >
                Suivant <i className="bi bi-caret-right-fill"></i>
              </Button>
              <span className="ms-3">ou</span>
              <Button type="button" onClick={(e) => addToggler(e)} className="ms-3 my-0 btn switch_auth">
                Se connecter
              </Button>
            </>
          )}
          {step === 3 && (
            <>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={inputValue.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicVerifPassword">
                <Form.Label>Confirmer mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  name="verifPassword"
                  value={inputValue.verifPassword}
                  onChange={handleChange}
                  placeholder="Confirmer le mot de passe"
                  required
                />
              </Form.Group>
              <Button 
              variant="primary" 
              type="submit" 
              className="btn"
              onClick={()=>setStep(2)} 
              >
                <i className="bi bi-caret-left-fill"></i> Precedent
              </Button>
              <Button variant="primary" type="submit" className="btn ms-2" disabled={disabled}>
                S'inscrire
              </Button>
              <span className="ms-3">ou</span>
              <Button type="button" onClick={(e) => addToggler(e)} className="ms-3 my-0 btn switch_auth">
                Se connecter
              </Button>
            </>
          )}
          <hr />
        </Form>
      </Col>
    </>
  )
}

export default Signup
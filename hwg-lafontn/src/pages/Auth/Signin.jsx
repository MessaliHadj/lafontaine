import { Form, Button, Col } from 'react-bootstrap';
import { useFormValidation } from '@/components/CustomHook/useFormValidation';
import SigninImg from '@/assets/signin.webp';
import SigninLargeImg from '@/assets/signin-large.webp';

const Signin = ({addToggler}) => {

  const initialValues = {
    email: '',
    phone_number: '',
    password: ''
  };

  const {
    inputType,
    disabled,
    inputRef,
    handleChange,
    updateInputTypeAndValue,
  } = useFormValidation(initialValues, 'signin');

  return (
    <>
      <div className="imgBx d-none d-md-block position-relative w-50">
        <img 
        src={SigninImg} 
        srcSet={`${SigninLargeImg} 1200w`}
        className='position-absolute start-0 w-100 h-100' 
        alt="Signin Image" 
        />
      </div>
      <Col className='formBx position-relative w-50 h-100'>
        <Form className="position-absolute start-0 w-100 h-100 px-4">
          <h2 className="mt-3 text-center">Se connecter</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Adresse email ou num de téléphone</Form.Label>
            <Form.Control
              ref={inputRef}
              type={inputType}
              name="identifier"
              onChange={updateInputTypeAndValue}
              placeholder="exemple@lafontn.fr ou +33633270270"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Mot de passe"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn" disabled={disabled}>
            Connexion
          </Button>
          <span className="ms-3">ou</span>
          <Button type="button" onClick={(e) => addToggler(e)} className="ms-3 my-0 btn switch_auth">
            Créer un compte
          </Button>
          <hr />
        </Form>
      </Col>
    </>
  );
};

export default Signin;
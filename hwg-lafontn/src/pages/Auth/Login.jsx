import { useEffect, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import useLocalStorage from '@/components/CustomHook/useLocalStorage';
import HandleForm from '@/components/Handler/HandleForm';

import SigninImg from '@/assets/signin.webp';
import SigninLargeImg from '@/assets/signin-large.webp';

const Signin = ({addToggler}) => {

  const savedIdentifier = localStorage.getItem('identifier');
  const initialIdentifier = savedIdentifier !== 'null' ? savedIdentifier : '';
  const [identifier, setIdentifier] = useLocalStorage('identifier', initialIdentifier);
  const [isChecked, setIsChecked] = useState(!!initialIdentifier)

  let initialValues = {
    email: initialIdentifier?.includes('@') ? initialIdentifier : '',
    phone_number: initialIdentifier?.includes('@') ? '' : initialIdentifier,
    password: ''
  };

  const { 
    inputValue,
    inputType,
    disabled,
    touchedFields,
    errorMsg,
    handleChange,
    handleBlur,
    handleSubmit
  } = HandleForm(initialValues, 'login', 'POST');

  const handleCheck = () => {
    setIsChecked(prevIsChecked => {
      const newIsChecked = !prevIsChecked;
      if (newIsChecked) {
        setIdentifier(inputValue.email || inputValue.phone_number);
      } else {
        setIdentifier(null);
      }
      return newIsChecked;
    });
  };

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
      <Col xs={12} md={6} className='formBx position-relative h-100'>
        <Form onSubmit={e=>handleSubmit(e)} className="position-absolute start-0 w-100 h-100 px-4">
          <h2 className="mt-3 text-center">Se connecter</h2>
          <Form.Group className="mb-3" controlId="formBasicIdentifier">
            <Form.Label>Adresse email ou num de téléphone</Form.Label>
            <Form.Control
              type={inputType}
              name="identifier"
              value={inputValue.email || inputValue.phone_number || ''}
              className={`${(touchedFields.identifier && (inputValue.email || inputValue.phone_number) && !errorMsg.email && !errorMsg.phone_number) && "is-valid"}`}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touchedFields.identifier && (!!errorMsg.email || !!errorMsg.phone_number)}
              placeholder="exemple@lafontn.fr ou 0633270270"
              aria-description='Utilisez votre adresse email ou votre numéro de téléphone pour vous identifier.'
              required
            />
            <Form.Control.Feedback type="invalid">
              {touchedFields.identifier && (errorMsg.email || errorMsg.phone_number)}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              name="password"
              className={`${(touchedFields.password && inputValue.password && !errorMsg.password) && "is-valid"}`}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touchedFields.password && !!errorMsg.password}
              placeholder="Mot de passe"
              aria-description="Saisissez votre mot de passe."
              required
            />
            <Form.Control.Feedback type="invalid">
              {touchedFields.password &&  errorMsg.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRememberMe">
            <Form.Check
              type="checkbox"
              name="rememberMe"
              onChange={handleCheck}
              checked={isChecked}
              id="formBasicRememberMe"
              label="Se souvenir de moi"
            />
          </Form.Group>
          <Button 
            variant="primary" 
            type='submit'
            className="btn"
            disabled={disabled}
          >
            Connexion
          </Button>
          <span className="ms-3">ou</span>
          <Button 
            type="button" 
            onClick={(e) => addToggler(e)} 
            className="ms-3 my-0 btn switch_auth"
          >
            Créer un compte
          </Button>
          <hr />
        </Form>
      </Col>
    </>
  );
};

export default Signin;
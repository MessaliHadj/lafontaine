import { Form, Button, Col } from 'react-bootstrap';
import SigninImg from '@/assets/signin.webp';
import SigninLargeImg from '@/assets/signin-large.webp';
import { useEffect, useState, useRef } from 'react';

const Signin = () => {
  const [disabled, setDisabled] = useState(true);
  const [inputType, setInputType] = useState("text");
  const [inputValue, setInputValue] = useState({
    email: '',
    phone_number: '',
    password: ''
  });

  const inputRef = useRef(null);

  const REGEX = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@&#$%]).{8,23}$/,
    phoneNumber: /^\+(?:\d{1,3})?\d{10,14}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  };

  const updateInputTypeAndValue = () => {
    const value = inputRef.current.value;
    const isEmail = /[a-zA-Z]/.test(value);
    setInputType(value === '' ? 'text' : isEmail ? 'email' : 'tel');
    setInputValue((prev) => ({
      ...prev,
      email: isEmail ? value : '',
      phone_number: isEmail ? '' : value
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue(prev => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    const { email, phone_number, password } = inputValue;
    const isEmailValid = email && REGEX.email.test(email) && REGEX.password.test(password);
    const isPhoneNumberValid = phone_number && REGEX.phoneNumber.test(phone_number) && REGEX.password.test(password);
    setDisabled(!(isEmailValid || isPhoneNumberValid));
  };

  useEffect(validateInputs, [inputValue]);

  return (
    <div className="form-container d-flex mx-auto">
      <img src={SigninImg} srcSet={`${SigninLargeImg} 1200w`} alt="Signin Image" className="d-none d-md-block" />
      <Col>
        <h2 className="mt-3 text-center">Se connecter</h2>
        <Form className="mx-4">
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
          <Button className="ms-3 my-0 btn switch_auth">
            Créer un compte
          </Button>
          <hr />
        </Form>
      </Col>
    </div>
  );
};

export default Signin;
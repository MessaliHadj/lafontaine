import { useState, useEffect, useRef } from 'react';
import { Regex } from '../Utils/Regex';


export const useFormValidation = (initialValues, formType) => {
  const [inputType, setInputType] = useState("text");
  const [inputValue, setInputValue] = useState(initialValues);
  const [step, setStep] = useState(1)
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef(null);

  const updateInputTypeAndValue = () => {
    const value = inputRef.current.value;
    const isEmail = /[a-zA-Z]/.test(value);
    setInputType(value === '' ? 'text' : isEmail ? 'email' : 'tel');
    setInputValue((prev) => ({
      ...prev,
      email: isEmail ? value : '',
      phone_number: isEmail ? '' : value.replace(/^0/, '+33')
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: name === 'phone_number' ? value.replace(/^0/, '+33') : value,
    }));
  };

  useEffect(() => {
    const { firstname, lastname, email, phone_number, password, verifPassword } = inputValue;
    const isFirstnameValid = firstname && Regex.userName.test(firstname);
    const isLastnameValid = lastname && Regex.userName.test(lastname);
    const isEmailValid = email && Regex.email.test(email);
    const isPhoneNumberValid = phone_number && Regex.phoneNumber.test(phone_number);
    const isPasswordValid = password && Regex.password.test(password);
    const isPasswordVerified = password === verifPassword;
    if (formType === 'signin') {
      setDisabled(!((isEmailValid || isPhoneNumberValid) && isPasswordValid));
    } else if (formType === 'signup') {
      if (step === 1) {
        setDisabled(!(isFirstnameValid && isLastnameValid && isPhoneNumberValid));
      }
      if (step === 2) {
        setDisabled(!(isFirstnameValid && isLastnameValid && isPhoneNumberValid && isEmailValid));
      }
      if (step === 3) {
        setDisabled(!(isFirstnameValid && isLastnameValid && isPhoneNumberValid && isEmailValid && isPasswordValid && isPasswordVerified));
      }
    }
  }, [inputValue, step]);

  return {
    inputType,
    inputValue,
    step,
    disabled,
    inputRef,
    setStep,
    handleChange,
    updateInputTypeAndValue,
  };
};

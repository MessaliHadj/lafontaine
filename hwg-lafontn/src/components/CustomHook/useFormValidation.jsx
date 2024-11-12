import { useState, useEffect, useRef, useMemo } from 'react';
import useFetch from '@/components/CustomHook/useFetch';
import useLocalStorage from '@/components/CustomHook/useLocalStorage';
import { Regex } from '../Utils/Regex';

const apiBaseUrl = import.meta.env.VITE_LAFONTN_API;

const useFormValidation = (initialValues, formType) => {
  const [inputType, setInputType] = useState("text");
  const [inputValue, setInputValue] = useState(initialValues);
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const inputRef = useRef(null);
  const { data, fetchData } = useFetch();
  // const [token, setToken] = useLocalStorage('token', null);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: ''
  };

  const validationResult = useMemo(() => {
    const { firstname, lastname, email, phone_number, password, verifPassword } = inputValue;

    return {
      isFirstnameValid: firstname && Regex.userName.test(firstname),
      isLastnameValid: lastname && Regex.userName.test(lastname),
      isEmailValid: email && Regex.email.test(email),
      isPhoneNumberValid: phone_number && Regex.phoneNumber.test(phone_number),
      isPasswordValid: password && Regex.password.test(password),
      isPasswordVerified: password === verifPassword,
    };
  }, [inputValue]);

  const updateInputTypeAndValue = () => {
    const value = inputRef.current.value;
    const isEmail = /[a-zA-Z]/.test(value);
    setInputType(value === '' ? 'text' : isEmail ? 'email' : 'tel');
    setInputValue((prev) => ({
      ...prev,
      email: isEmail ? value : '',
      phone_number: isEmail ? '' : value.replace(/^0/, '+33'),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: name === 'phone_number' ? value.replace(/^0/, '+33') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue && !disabled) {
      const endpoint = formType === 'signin' ? 'login' : 'signup';
      const requestUrl = `${apiBaseUrl}${endpoint}`;
      const requestOptions = {
        ...options,
        body: JSON.stringify(inputValue),
      };
      console.log('url de la requete:', requestUrl);

      try {
        const result = await fetchData(requestUrl, requestOptions);
        console.log(result);
        if (result && result.access_token) {
          setToken(result.access_token);
        }
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
      }
    }
  };

  useEffect(() => {
    const {
      isFirstnameValid,
      isLastnameValid,
      isEmailValid,
      isPhoneNumberValid,
      isPasswordValid,
      isPasswordVerified
    } = validationResult;

    if (formType === 'signin') {
      setDisabled(!((isEmailValid || isPhoneNumberValid) && isPasswordValid));
    } else if (formType === 'signup') {
      if (step === 1) {
        setDisabled(!(isFirstnameValid && isLastnameValid && isPhoneNumberValid));
      } else if (step === 2) {
        setDisabled(!(isFirstnameValid && isLastnameValid && isPhoneNumberValid && isEmailValid));
      } else if (step === 3) {
        setDisabled(!(
          isFirstnameValid &&
          isLastnameValid &&
          isPhoneNumberValid &&
          isEmailValid &&
          isPasswordValid &&
          isPasswordVerified
        ));
      }
    }
  }, [validationResult, step, formType]);

  return {
    inputType,
    inputValue,
    step,
    disabled,
    inputRef,
    setStep,
    handleChange,
    handleSubmit,
    updateInputTypeAndValue,
  };
};

export default useFormValidation;
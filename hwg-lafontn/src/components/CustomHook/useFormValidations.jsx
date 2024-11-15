import { useState, useEffect, useMemo } from 'react';
import { Regex } from '../Utils/Regex';

const useFormValidations = (inputValue, form) => {
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [errorMsg, setErrorMsg] = useState({});
  const { firstname, lastname, email, phone_number, password, verifPassword } = inputValue || {};  

  const validationResult = useMemo(() => {
    return {
      isFirstnameValid: firstname && Regex.userName.test(firstname),
      isLastnameValid: lastname && Regex.userName.test(lastname),
      isEmailValid: email && Regex.email.test(email),
      isPhoneNumberValid: phone_number && Regex.phoneNumber.test(phone_number),
      isPasswordValid: password && Regex.password.test(password),
      isPasswordVerified: password === verifPassword,
    };
  }, [inputValue]);

  useEffect(() => {
    const {
      isFirstnameValid,
      isLastnameValid,
      isEmailValid,
      isPhoneNumberValid,
      isPasswordValid,
      isPasswordVerified
    } = validationResult;

    const newErrorMsg = {};
    if (!isFirstnameValid && firstname) 
      newErrorMsg.firstname = "Le prenom doit contenir que des lettres, des espaces, des apostrophes ou des tirets. Longueur maximale : 23 caractères.";
    if (!isLastnameValid && lastname) 
      newErrorMsg.lastname = "Le nom doit contenir que des lettres, des espaces, des apostrophes ou des tirets. Longueur maximale : 23 caractères.";
    if (!isLastnameValid && lastname && !isFirstnameValid && firstname) {
      newErrorMsg.completname = "Le nom et le prenom doivent contenir que des lettres, des espaces, des apostrophes ou des tirets. Longueur maximale : 23 caractères.";
    }
    if (!isEmailValid && email) 
      newErrorMsg.email = "Adresse email doit avoir le bon format.";
    if (!isPhoneNumberValid && phone_number) 
      newErrorMsg.phone_number = "Numéro de téléphone doit avoir le bon format.";
    if (!isPasswordValid && password) 
      newErrorMsg.password = "Le mot de passe doit contenir entre 8 et 23 caractères, une majuscule, une minuscule, un chiffre, et un caractère spécial (!,@,&,#,$,%).";
    if (!isPasswordVerified && verifPassword) 
      newErrorMsg.verifPassword = "Les mots de passe ne correspondent pas";
    
    setErrorMsg(newErrorMsg);

    if (form === 'login') {
      setDisabled(!((isEmailValid || isPhoneNumberValid) && isPasswordValid));
    } else if (form === 'signup') {
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
  }, [validationResult, step, form]);

  return { validationResult, errorMsg, setErrorMsg, step, setStep, disabled, setDisabled };
};

export default useFormValidations;

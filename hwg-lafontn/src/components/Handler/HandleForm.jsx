import { useState, useEffect, useContext } from 'react';
import useFormValidations from '@/components/CustomHook/useFormValidations';
import useFetch from '@/components/CustomHook/useFetch';
import useCookie from '@/components/CustomHook/useCookie';
import { UserContext } from '@/components/Contexts/UserContext';

const apiBaseUrl = import.meta.env.VITE_LAFONTN_API;

const HandleForm = (initialValues, endpoint, methode) => {

  const [inputValue, setInputValue] = useState(initialValues);
  const [inputType, setInputType] = useState("text");
  const [touchedFields, setTouchedFields] = useState({});

  const { disabled, errorMsg, step, setStep } = useFormValidations(inputValue, endpoint)
  const { data, loading, error, fetchData } = useFetch();

  const { cookieValue, updateCookie, removeCookie } = useCookie('token');

  const { setUser } = useContext(UserContext);

  const requestUrl = `${apiBaseUrl}${endpoint}`;

  const options = {
    method: methode,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${cookieValue}`,
    },
    body: ''
  };

  const updateInputTypeAndValue = value => {
    const isEmail = /[a-zA-Z]/.test(value);
    setInputType(value === '' ? 'text' : isEmail ? 'email' : 'tel');
    setInputValue((prev) => ({
      ...prev,
      email: isEmail ? value : '',
      phone_number: isEmail ? '' : value.replace(/^0/, '+33'),
    }));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: false }));
    if (name === 'identifier') {
      updateInputTypeAndValue(value)
    } else {
      setInputValue((prev) => ({
        ...prev,
        [name]: name === 'phone_number' ? value.replace(/^0/, '+33').trim() : typeof(value) == String ? value.trim() : value,
      }));
    }
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue && !disabled) {
      const requestOptions = {
        ...options,
        body: JSON.stringify(inputValue),
      };
      
      try {
        await fetchData(requestUrl, requestOptions);
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
      }
    }
  };

  useEffect(() => {
    if (error) {
      console.log(error.message);
    }
    if (data) {
      if (data.access_token) {
        updateCookie(data.access_token);
        setUser(data.user);
      }
    }
  }, [data, error]);

  return {inputValue, inputType, disabled, touchedFields, errorMsg, step, setStep, handleChange, handleBlur, handleSubmit}
}

export default HandleForm
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/components/Contexts/UserContext';
import "@/styles/AccountStyle.css";
import ScrollToTop from "@/components/Handler/ScrollToTop";
import Section1 from "./Section1";
import Section2 from "./Section2";

const index = () => {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate('/');
  }, [user, navigate]);

  return (
    <>
      <ScrollToTop/>
      <Section1/>
      <Section2/>
    </>
  )
}

export default index
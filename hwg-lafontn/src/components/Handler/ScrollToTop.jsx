import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const handleScrollTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    handleScrollTop();
    return
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
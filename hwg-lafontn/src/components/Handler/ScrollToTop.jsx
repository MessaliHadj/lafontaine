import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    const handleScrollTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    handleScrollTop();
    return
  });

  return null;
};

export default ScrollToTop;
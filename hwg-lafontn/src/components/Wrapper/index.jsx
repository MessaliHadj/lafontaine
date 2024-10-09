import Footer from "./Footer";
import Header from "./Header"

const index = ({children}) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
};

export default index;
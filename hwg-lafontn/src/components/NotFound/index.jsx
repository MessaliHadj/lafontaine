import { Link } from "react-router-dom";
import notfound from '@/assets/404.webp'
import './NotFound.css'

const index = () => {
  return (
    <section className="notFound">
      <img className="notFound" src={notfound} alt="not found image" />
      <h2 className="notFound">404</h2>
      <Link className='backToHome' to={"/"}>BACK TO HOME</Link>
    </section>
  );
};

export default index;
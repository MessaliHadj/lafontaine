import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import About from './pages/About';
import Auth from './pages/Auth';
import Account from './pages/Account';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/menu" element={<Menu />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/account" element={<Account />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </main>
  );
};

export default App;
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </main>
  );
};

export default App;
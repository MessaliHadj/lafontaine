import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.jsx'
import { UserProvider } from "./components/Contexts/UserContext"
import Wrapper from './components/Wrapper'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <Wrapper>
          <App />
        </Wrapper>
      </UserProvider>
    </Router>
  </React.StrictMode>
)

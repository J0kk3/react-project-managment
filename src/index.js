import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { authContextProvider } from './context/authContext';
//Styles
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <authContextProvider>
      <App />
    </authContextProvider>
  </React.StrictMode>,
  document.getElementById( 'root' )
);
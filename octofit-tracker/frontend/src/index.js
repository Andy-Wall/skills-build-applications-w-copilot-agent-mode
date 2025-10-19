
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// Set REACT_APP_CODESPACE_NAME from environment if available
if (window && window.location && window.location.host) {
  const match = window.location.host.match(/^([^-]+)-8000\.app\.github\.dev/);
  if (match) {
    process.env.REACT_APP_CODESPACE_NAME = match[1];
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

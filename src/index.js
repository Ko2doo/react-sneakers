import React from 'react';
import ReactDOM from 'react-dom/client';

// Импортируем scss
import './scss/stylesheet.scss';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

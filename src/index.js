import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

// Импортируем scss
import './scss/stylesheet.scss';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <React.Fragment>
      <Router>
        <App />
      </Router>
    </React.Fragment>
  </React.StrictMode>,
);

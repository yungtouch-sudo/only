import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/general/normalize.scss';
import './styles/general/fonts.scss';
import './styles/general/global.scss';
import './styles/blocks/historical-dates.scss';

import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



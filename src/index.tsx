import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CustomRouter } from './routes/router';
import customHistory from './routes/history';
import Provider from './lib/provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider>
      <CustomRouter history={customHistory}>
        <App />
      </CustomRouter>
    </Provider>
  </React.StrictMode>
);

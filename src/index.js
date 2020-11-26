import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './scss/index.scss';
import App from './components/App';
import storage from './utils/storage';
import { setupTokenClient } from './api/client';

const initialToken = storage.get('userToken') || '';

setupTokenClient(initialToken);

ReactDOM.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <App initialToken={initialToken} />
    {/* </React.StrictMode> */}
  </BrowserRouter>,
  document.getElementById('root'),
);

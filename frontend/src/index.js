import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './auth/Routes';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <BrowserRouter>
      <Routes/> 
  </BrowserRouter>,
  document.getElementById('root'));


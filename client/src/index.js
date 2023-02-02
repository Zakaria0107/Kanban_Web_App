import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import store  from './store/UI/StoreConfiguration'
import { Provider } from 'react-redux' 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<App />} />
        <Route exact path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
      
    </Provider>
  </React.StrictMode>
);

import React from 'react';
//import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from "react-dom/client";
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Provider } from 'react-redux';
import store from './redux/store';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  
   <Provider store={store}>
    <App />
  </Provider>
  
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
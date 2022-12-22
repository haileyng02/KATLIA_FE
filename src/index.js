import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { ConfigProvider } from 'antd';
import './index.css';
import App from './App';
import allReducers from './reducers'
import reportWebVitals from './reportWebVitals';

const middleware = [thunk]
const store = createStore(allReducers, applyMiddleware(...middleware));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#E0A184',
      },
    }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

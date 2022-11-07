import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { render } from "react-dom";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Root from './routes/root';
import Login from './routes/Login';
import Feed from './routes/Feed';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/feed",
    element: <Feed />
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

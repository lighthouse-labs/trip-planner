import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.scss';

import App from './components/App';
import Register from './components/Register';
import Plannings from './components/Plannings';
import Generate from './components/Generate';
import AdvancedSearch from './components/AdvancedSearch'
import reportWebVitals from './reportWebVitals';
import Login from './components/Login';
import UserProfile from './components/UserProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "plannings",
    element: <Plannings />,
  },
  {
    path: "generate",
    element: <Generate />,
  },
  {
    path: "advanced",
    element: <AdvancedSearch />,
  },
  {
    path: "profile",
    element: <UserProfile/>,
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

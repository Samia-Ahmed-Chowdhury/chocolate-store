import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Forms from './components/Forms.jsx';
import Updated from './components/Updated.jsx';
import View from './components/View.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import ProtectedRoutes from './protectRoutes/ProtectRoutes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },

  {
    path: "signup",
    element: <Signup/>,
  },
  {
    path: "home",
    element: <ProtectedRoutes><App/></ProtectedRoutes>
  },
  {
    path: "form",
    element: <ProtectedRoutes><Forms/></ProtectedRoutes>
  },
  {
    path: "items/:id",
    element:<ProtectedRoutes> <View/></ProtectedRoutes>,
    loader:({params})=>fetch(`http://localhost:3000/items/${params.id}`)
  },
  {
    path: "update/:id",
    element: <ProtectedRoutes><Updated/></ProtectedRoutes>,
     loader:({params})=>fetch(`http://localhost:3000/items/${params.id}`)
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <RouterProvider router={router} />
  </AuthProvider>,
)

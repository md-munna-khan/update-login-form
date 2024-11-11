import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from './layout/MainLayout.jsx';
import Home from './assets/components/Home/Home.jsx';
import Login from './assets/components/login/Login.jsx';
import Register from './assets/components/register/Register.jsx';
import SignIn from './assets/components/signIn/SignIn.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout></MainLayout> ,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'register',
        element:<Register></Register>
      },{
        path:'signIn',
        element:<SignIn></SignIn>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

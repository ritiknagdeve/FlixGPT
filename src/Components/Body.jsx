import React from 'react'
import Login from './Login'
import Browse from './Browse'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';  
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {
  const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    
    {
        path: '/browse',
        element: <Browse />
    }
  ]);

  

  return (
    <RouterProvider router={router} />
  )

}

export default Body
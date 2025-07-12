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
  const dispatch = useDispatch();
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

  useEffect(() => {
   
    onAuthStateChanged(auth, async (user) => {
    if (user) {
     
      const {uid, email, displayName, photoURL} = user;
      
      // If user doesn't have displayName or photoURL, update it
      if (!displayName || !photoURL) {
        try {
          const nameFromEmail = email.split('@')[0]; // Extract name from email
          const defaultPhotoURL = `https://ui-avatars.com/api/?name=${nameFromEmail}&background=dc2626&color=fff&size=128`;
          
          await updateProfile(user, {
            displayName: displayName || nameFromEmail,
            photoURL: photoURL || defaultPhotoURL
          });
          
          // Get updated user info after profile update
          const updatedUser = auth.currentUser;
          dispatch(addUser({
            uid: updatedUser.uid, 
            email: updatedUser.email, 
            displayName: updatedUser.displayName, 
            photoURL: updatedUser.photoURL
          }));
          
          console.log("Profile updated and user added to store:", {
            uid: updatedUser.uid, 
            email: updatedUser.email, 
            displayName: updatedUser.displayName, 
            photoURL: updatedUser.photoURL
          });
          
        } catch (error) {
          console.error("Error updating profile:", error);
          // Still add user to store even if profile update fails
          dispatch(addUser({uid, email, displayName, photoURL}));
        }
      } else {
        // User already has displayName and photoURL
        dispatch(addUser({uid, email, displayName, photoURL}));
        console.log("User is signed in:", {uid, email, displayName, photoURL});
      }

    } else {
      // User is signed out
      dispatch(removeUser());
      console.log("User is signed out");
      
    }
});
  }, []);

  return (
    <RouterProvider router={router} />
  )

}

export default Body
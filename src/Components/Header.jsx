// we will create FlixGPT header component we have tailwind configured with us

import React from 'react'
import flixgptLogo from '../assets/flixgpt-logo.svg'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/'); // Redirect to login page after sign out
      console.log("User signed out successfully");


    }).catch((error) => {
      // An error happened.
      console.log("Sign-out error:", error);
      navigate('/error'); 
    });

  }
  return (
    <>
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center p-4">
          <img src={flixgptLogo} alt="FlixGPT Logo" className="h-12 w-auto mr-4" />
      </div>
      <div className="flex items-center">
        {user && (
          <>
            {user.photoURL ? (
              <img src={user.photoURL} alt="user dp" className="rounded-full h-10 w-10 mr-4" />
            ) 
            : (
              <div className="rounded-full h-10 w-10 mr-4 bg-gray-500 flex items-center justify-center text-white font-bold">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors" onClick={handleSignOut}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
    </>
  )
}

export default Header
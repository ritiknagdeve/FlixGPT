// we will create FlixGPT header component we have tailwind configured with us

import React,{useEffect, useState} from 'react'
import flixgptLogo from '../assets/flixgpt-logo.svg'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';  
import { addUser, removeUser } from '../utils/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("User signed out successfully");


    }).catch((error) => {
      // An error happened.
      console.log("Sign-out error:", error);
    });

  }

  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
        navigate('/browse'); // Redirect to browse page after sign in
      } else {
        // User is signed out
        dispatch(removeUser());
        console.log("User is signed out");
        navigate('/'); // Redirect to login page after sign out
      }
      
      // Auth check is complete
      setIsAuthLoading(false);
    });

    return(() => {
      // Cleanup function to unsubscribe from auth state changes
      unsubscribe();
    });
  }, []);

  return (
    <>
    <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
      <div className="flex items-center p-4">
          <img src={flixgptLogo} alt="FlixGPT Logo" className="h-12 w-auto mr-4" />
      </div>
      <div className="flex items-center">
        {/* Show user controls only when auth is loaded and user exists */}
        {!isAuthLoading && user && (
          <>
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="dp" 
                className="rounded-full h-10 w-10 mr-4"
                onError={(e) => {
                  console.log("Image failed to load:", user.photoURL);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            
            {/* Fallback avatar - show if no photoURL or image fails to load */}
            <div 
              className="rounded-full h-10 w-10 mr-4 bg-red-600 flex items-center justify-center text-white font-bold"
              style={{ display: user.photoURL ? 'none' : 'flex' }}
            >
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            
            <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors" onClick={handleSignOut}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </>
        )}
        
        {/* Optional: Show loading indicator while auth is checking */}
        {isAuthLoading && (
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>
    </div>
    </>
  )
}

export default Header
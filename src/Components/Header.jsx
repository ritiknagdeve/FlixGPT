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

  const [isAISearchPage, setIsAISearchPage] = useState(false);

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.


    }).catch((error) => {
      // An error happened.
    });

  }

  const handleAISearch = () => {
    setIsAISearchPage(true);
    navigate('/browse/ai-search'); 
  }

  const goToHome = () => {
    setIsAISearchPage(false);
    navigate('/browse');
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
            // Still add user to store even if profile update fails
            dispatch(addUser({uid, email, displayName, photoURL}));
          }
        } else {
          // User already has displayName and photoURL
          dispatch(addUser({uid, email, displayName, photoURL}));
        }
        if (window.location.pathname === '/browse/ai-search') {
          setIsAISearchPage(true);
          navigate('/browse/ai-search');
        } else {
          setIsAISearchPage(false);
          navigate('/browse');
        }
         // Redirect to browse page after sign in
      } else {
        // User is signed out
        dispatch(removeUser());
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
    <div className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-2 sm:p-4 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
      <div className="flex items-center p-2 sm:p-4">
          <img src={flixgptLogo}  alt="FlixGPT Logo" className="h-8 sm:h-12 w-auto mr-2 sm:mr-4" />
      </div>
      <div className="flex items-center gap-2 sm:gap-0">
        {/* Show user controls only when auth is loaded and user exists */}
        {!isAuthLoading && user && (
          <>
            {/* AI Search Button */}
            <button onClick={() => {!isAISearchPage ? handleAISearch() : goToHome()} }
              className="flex items-center bg-gray-800 hover:bg-gray-700 text-white px-2 sm:px-4 py-2 rounded-md transition-all duration-200 mr-2 sm:mr-4 border border-gray-600 hover:border-gray-500 group text-sm sm:text-base"
            >
              <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">{ !isAISearchPage ? "Ask AI" : "Go to Home" }</span>
              <span className="sm:hidden">{ !isAISearchPage ? "AI" : "Home" }</span>
              <svg className="w-4 h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="dp" 
                className="rounded-full h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-4"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            
            {/* Fallback avatar - show if no photoURL or image fails to load */}
            <div 
              className="rounded-full h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-4 bg-red-600 flex items-center justify-center text-white font-bold text-sm sm:text-base"
              style={{ display: user.photoURL ? 'none' : 'flex' }}
            >
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            
            <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-2 sm:px-4 py-2 rounded transition-colors text-sm sm:text-base" onClick={handleSignOut}>
              <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Logout</span>
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
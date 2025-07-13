// this component have background image like we have in netflix login page
import React from 'react'
import Header from './Header'
import flixbg from '../assets/flixbg.jpg'
import { useState, useRef } from 'react'
import {validate} from "../utils/validate"
import { auth } from '../utils/firebase' 
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom';

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { googleProvider } from "../utils/firebase";

const Login = () => {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState("");

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("Google Sign-in successful:", user);
        navigate('/browse'); // Redirect to browse page after successful Google sign-in
        // Redirect to dashboard/home page
      })
      .catch((error) => {
        console.error("Google Sign-in error:", error);
        setError(error.message);
      });
  };
  
  function toggleSignInForm() {
    setIsSignIn(!isSignIn);
    setError(""); // Clear error message
    
    // Clear form fields
    if (email.current) email.current.value = "";
    if (password.current) password.current.value = "";
    if (name.current) name.current.value = "";
  }

  const submitForm = (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    const validation = validate(emailValue, passwordValue, isSignIn);
    // console.log(validation);
    if(validation !== null) {
      setError(validation);
      return; 
    }

    if(!isSignIn){
      // signup logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        navigate('/browse'); // Redirect to browse page after successful signup
        // console.log("User created:", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log("Error: " + errorMessage);
        setError(errorMessage); 
      });
    }
    else{
      // signin logic
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate('/browse'); // Redirect to browse page after successful signin
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: " + errorMessage);
        setError(errorMessage);
      });

    }
    
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${flixbg})` }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      {/* Header */}
      <div className="relative z-10">
        <Header />
      </div>
      
      {/* Content Area */}
      <div className="relative z-10 flex items-center justify-center pt-28">
        <form className="bg-black bg-opacity-75 p-12 rounded-xl w-full max-w-md mx-4">
          <h1 className="text-white text-3xl font-bold mb-8">{isSignIn ? "Sign In" : "Sign Up"}</h1>
          { !isSignIn && <input 
            type="text" ref={name}
            placeholder="Full Name" 
            className="w-full p-4 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-white" 
          />}
          <input ref={email}
            type="email" 
            placeholder="Email or phone number" 
            className="w-full p-4 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-white" 
          />
          <input ref={password}
            type="password" 
            placeholder="Password" 
            className="w-full p-4 mb-6 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-white" 
          />
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button onClick={submitForm} className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded font-semibold mb-4 transition-colors">
            Sign{isSignIn ? " In" : " Up"}
          </button>
          
          {/* OR divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="px-4 text-gray-400">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Google Sign-in Button */}
          <button
            onClick={signInWithGoogle}
            type="button"
            className="w-full bg-white hover:bg-gray-100 text-gray-900 p-4 rounded font-semibold mb-4 transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              {/* Google icon SVG */}
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="text-gray-400 text-center">
           {isSignIn ? "New to Netflix?": "Already Registered?" } <button onClick={toggleSignInForm}type="button" className="text-white hover:underline">{isSignIn?"Sign Up now":"Sign In"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
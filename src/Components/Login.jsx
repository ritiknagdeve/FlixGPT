// this component have background image like we have in netflix login page
import React from 'react'
import Header from './Header'
import flixbg from '../assets/flixbg.jpg'
import { useState } from 'react'

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  
  function toggleSignIn() {
    setIsSignIn(!isSignIn);
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
      <div className="relative z-10 flex items-center justify-center pt-20">
        <form className="bg-black bg-opacity-75 p-12 rounded-xl w-full max-w-md mx-4">
          <h1 className="text-white text-3xl font-bold mb-8">{isSignIn ? "Sign In" : "Sign Up"}</h1>
          { !isSignIn && <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full p-4 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-white" 
          />}
          <input 
            type="email" 
            placeholder="Email or phone number" 
            className="w-full p-4 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-white" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 mb-6 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-white" 
          />
          <button className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded font-semibold mb-4 transition-colors">
            Sign{isSignIn ? "In" : " Up"}
          </button>
          <div className="text-gray-400 text-center">
           {!isSignIn ? "New to Netflix?": "Already Registered?" } <button onClick={toggleSignIn}type="button" className="text-white hover:underline">{isSignIn?"Sign Up now":"Sign In"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
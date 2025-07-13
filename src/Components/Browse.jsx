import React,{useEffect} from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlaying';
import {Outlet} from 'react-router-dom';

const Browse = () => {

  
  useNowPlayingMovies(); // Fetch now playing movies on component mount

  return (
    <>
    <div className="min-h-screen bg-black">
      <Header />
      <Outlet />
    </div>
    </>
  )
}

export default Browse;
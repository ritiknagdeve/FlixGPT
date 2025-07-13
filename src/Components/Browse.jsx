import React,{useEffect} from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlaying';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  
  useNowPlayingMovies(); // Fetch now playing movies on component mount

  return (
    <>
    <div className="min-h-screen bg-black">
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
    </>
  )
}

export default Browse;
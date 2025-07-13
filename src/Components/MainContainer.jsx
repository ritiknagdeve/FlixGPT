import React from 'react'
import {useSelector} from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlaying);
  
  // if(!movies) return;
  if(!movies) return <div className="w-[99vw] h-screen bg-black"></div>;

  const mainMovie = movies?.[0];

  const{ title, overview, id} = mainMovie;
  
  // Add safety check for movieId
  const movieId = id || mainMovie?.movie_id || mainMovie?.tmdb_id;
  
  return (
    <div>
        <VideoBackground  movieId={movieId}/>
        <VideoTitle title={title} overview={overview} />
    </div>
  )
}

export default MainContainer
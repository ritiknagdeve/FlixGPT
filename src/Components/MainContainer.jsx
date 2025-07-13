import React from 'react'
import {useSelector} from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlaying);
  
  // Debug logs
  console.log("Full Redux store:", useSelector(store => store));
  console.log("Movies slice:", useSelector(store => store.movies));
  console.log("Now playing movies:", movies);
  
  // if(!movies) return;
  if(!movies) return <div className="w-[99vw] h-screen bg-black"></div>;

  const mainMovie = movies?.[0];
  console.log("mainMovie: " ,mainMovie);
  console.log("mainMovie keys:", Object.keys(mainMovie || {}));
  console.log("mainMovie.id:", mainMovie?.id);

  const{ title, overview, id} = mainMovie;
  
  // Add safety check for movieId
  const movieId = id || mainMovie?.movie_id || mainMovie?.tmdb_id;
  console.log("Extracted movieId:", movieId);
  
  return (
    <div>
        <VideoBackground  movieId={movieId}/>
        <VideoTitle title={title} overview={overview} />
    </div>
  )
}

export default MainContainer
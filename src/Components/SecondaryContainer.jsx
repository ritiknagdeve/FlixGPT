import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div>
      <MovieList title={"Now Playing"} movies={movies.nowPlaying} />
      <MovieList title={"Trending Now"} movies={movies.nowPlaying} />
      <MovieList title={"Popular Lately"} movies={movies.nowPlaying} />
      <MovieList title={"The OGs"} movies={movies.nowPlaying} />
    </div>
  )
}

export default SecondaryContainer
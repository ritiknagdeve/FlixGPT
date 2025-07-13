import React from 'react'
import {useRef} from 'react';
import { useDispatch } from 'react-redux';
import { addAiResults, addTmdbResults, setLoading } from '../utils/aiSlice';
import { options } from '../utils/constants';
import AIMovieContainer from './AIMovieContainer'; 

const AISearch = () => {
  
  const dispatch = useDispatch();

  const searchText = useRef(null);

  const searchTmdbMovie = async (movieName) => {
    // Function to search TMDB for a movie by name
    const apiURL = 'https://api.themoviedb.org/3/search/movie?query='+ movieName.trim() +'&include_adult=false&language=en-US&page=1';
    try {
      const response = await fetch(apiURL, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results; // Return the results instead of dispatching

    } catch (error) {
      console.log("Error fetching TMDB movie:", error);
      return []; // Return empty array on error
    }
  }
  const handleAISearch = async () => {
    if(searchText.current.value.trim() === "") {
      alert("Please enter a search query");
      return;
    }
    const searchquery = searchText.current.value.trim();

    const query = "Act as a movie recommendation system and suggest some movies for the query: " + searchquery + ". Only give me names of 5 movies , comma seperated like the example result given ahead. Example Result: Golmaal, Dhamaal, Hera Pheri, Dhol, Chup Chup ke.";

    console.log(query);
    
    // Set loading state
    dispatch(setLoading(true));
    
    try {
      // Make API call to your backend server
      const response = await fetch('/api/ask', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: query }),
      });
      
      // Check if response is ok
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse the response
      const data = await response.json();
      console.log("AI Response:", data);
      
      // store the AI response to redux store
      dispatch(addAiResults(data.text));

      const aiMoviesArray = data.text.split(',');
      console.log("API Movies Array:", aiMoviesArray);

      const tmdbMovies = aiMoviesArray.map((movie) => searchTmdbMovie(movie));
      console.log("TMDB Movies Promises:", tmdbMovies);

      const finalResults = await Promise.all(tmdbMovies);
      console.log("Final Results:", finalResults);
     
      dispatch(addTmdbResults(finalResults));
      
      //pass the AI response to tmdb API to get movie details

      
    } catch (error) {
        console.error("Error fetching AI response:", error);
        alert("Failed to get AI response. Please try again later.");
        dispatch(setLoading(false)); // Stop loading on error
    }
 }
  

  return (
    <>
    <div className="mb-4 bg-black text-white">
      {/* Content Container with proper spacing from header */}
      <div className="pt-24 px-8 flex justify-center">
        <div className="w-full max-w-4xl">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Your Movie Reccomendation Buddy!</h1>
            <p className="text-gray-400 text-lg">Discover your next favorite movie with AI recommendations</p>
          </div>
          
          {/* Search Form */}
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 w-3/4 mx-auto">
            <input ref={searchText}
              type="text"
              placeholder=""
              className="flex-1 p-4 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-base"
            />
            <button onClick={handleAISearch}
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold min-w-[120px] flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Ask AI
            </button>
          </form>
          
         
        </div>
      </div>
    </div>
    <AIMovieContainer />
    </>
  )
}

export default AISearch
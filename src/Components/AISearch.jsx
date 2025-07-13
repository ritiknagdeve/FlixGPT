import React from 'react'
import {useRef} from 'react';
import {ai} from '../utils/gemini';
import {googlegeminiAPIKey} from '../utils/constants';

const AISearch = async() => {

  const searchText = useRef(null);
  const handleAISearch = async() => {
    if(searchText.current.value.trim() === "") {
      alert("Please enter a search query");
      return;
    }
    const query = searchText.current.value.trim();

    const aiResults = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query,
    });
    console.log(response.text);
    
 }
  

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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
  )
}

export default AISearch
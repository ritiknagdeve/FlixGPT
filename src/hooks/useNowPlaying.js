import {options, nowPlayingAPIURL} from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlaying} from '../utils/movieSlice';
import { useEffect } from 'react';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const getNowPlayingMovies = async () => {
        try {
        const response = await fetch(nowPlayingAPIURL, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);    
        }
        const data = await response.json();
        console.log("Now Playing Movies:", data.results);

        dispatch(addNowPlaying(data.results)); // Dispatch action to add movies to store
        // Process the data as needed
        } catch (error) {
        console.error("Error fetching now playing movies:", error);
        }
    };
    
    useEffect(() => {
        getNowPlayingMovies();
    }, []);

}

export default useNowPlayingMovies;
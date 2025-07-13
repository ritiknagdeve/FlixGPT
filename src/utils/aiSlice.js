import { createSlice } from '@reduxjs/toolkit';

const AiSlice = createSlice({
    name: 'ai',
    initialState: {
        aiResults: null,
        tmdbResults: null,
        isLoading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        addAiResults: (state, action) => {
            state.aiResults = action.payload;
        },
        addTmdbResults: (state, action) => {
            state.tmdbResults = action.payload;
            state.isLoading = false; // Stop loading when results are ready
        },
        clearResults: (state) => {
            state.aiResults = null;
            state.tmdbResults = null;
            state.isLoading = false;
        }
    }
});

export const {setLoading, addAiResults, addTmdbResults, clearResults} = AiSlice.actions;
export default AiSlice.reducer;
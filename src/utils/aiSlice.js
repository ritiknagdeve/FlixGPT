import { createSlice } from '@reduxjs/toolkit';
const AiSlice = createSlice({
    name: 'ai',
    initialState: {
        aiResults: null,
        tmdbResults: null,
    },
    reducers: {
        addAiResults: (state, action) => {
            state.aiResults = action.payload;
        },
        addTmdbResults: (state, action) => {
            state.tmdbResults = action.payload;
        }
    }
});

export const {addAiResults, addTmdbResults} = AiSlice.actions;
export default AiSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";


const geminiSlice = createSlice({
    name: "gemini",
    initialState: {
        movies: [],
        error: ''
    },
    reducers: {
        addMovieName:(state,action)=>{
            state.movies = action.payload;
            state.error = ''; 
        },
        setError: (state, action) => {
            state.error = action.payload; 
          },
    }
})

export const {addMovieName , setError} = geminiSlice.actions;
export default geminiSlice.reducer
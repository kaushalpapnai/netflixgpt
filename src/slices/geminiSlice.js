import { createSlice } from "@reduxjs/toolkit";


const geminiSlice = createSlice({
    name: "gemini",
    initialState: null,
    reducers: {
        addMovieName:(state,action)=>{
            return action.payload
        }
    }
})

export const {addMovieName} = geminiSlice.actions;
export default geminiSlice.reducer
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import movieSlice from "../slices/movieSlice";
import gptSlice from "../slices/gptSlice";
import geminiSlice from "../slices/geminiSlice"


const store = configureStore(
    {
        reducer:{
            user : userSlice,
            movies : movieSlice,
            gpt : gptSlice,
            gemini : geminiSlice,
        },
    }
)

export default store
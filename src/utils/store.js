import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import movieSlice from "../slices/movieSlice";
import gptSlice from "../slices/gptSlice";
import geminiSlice from "../slices/geminiSlice"
import playerSlice from "../slices/playerSlice"
import loadingSlice from "../slices/loadingSlice"


const store = configureStore(
    {
        reducer:{
            user : userSlice,
            movies : movieSlice,
            gpt : gptSlice,
            gemini : geminiSlice,
            player: playerSlice,
            loading:loadingSlice
        },
    }
)

export default store
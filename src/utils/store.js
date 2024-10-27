import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import movieSlice from "../slices/movieSlice";
import gptSlice from "../slices/gptSlice"


const store = configureStore(
    {
        reducer:{
            user : userSlice,
            movies : movieSlice,
            gpt : gptSlice,
        },
    }
)

export default store
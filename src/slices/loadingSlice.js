import { createSlice } from "@reduxjs/toolkit";



const loadingSlice = createSlice({
    name:"loading",
    initialState:{
        searchMovieLoading:true
    },
    reducers:{
        addSearchMovieLoading:(state,action)=>{
            console.log(state)
             return action.payload
        }
    }
})


export const {addSearchMovieLoading} = loadingSlice.actions
export default loadingSlice.reducer
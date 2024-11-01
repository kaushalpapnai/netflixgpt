import { createSlice } from "@reduxjs/toolkit";



const playerSlice = createSlice({
    name:"player",
    initialState:null,
    reducers:{
        addVideoId:(state,action)=>{
            return action.payload
        }
    }
})

export const {addVideoId} = playerSlice.actions
export default playerSlice.reducer
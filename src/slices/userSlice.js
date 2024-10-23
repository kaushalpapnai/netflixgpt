import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState: null,
    reducers:{
        addUser:(state,action)=>{
             return action.payload   // so here we cannot directly change the state like state = action.payload we can change the properties inside it like we did in count slice state.value = action.payload but we cannot directly assign the new state with the current state so we have to return it.
        },
        removeUser: (state)=>{
           return null
        }
    }
})

export const {addUser,removeUser} = userSlice.actions
export default userSlice.reducer
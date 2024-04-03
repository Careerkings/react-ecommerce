import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    loading: false,
    error: null   
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
        signInPending: (state, action) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            console.log(state.currentUser);
            state.error = null
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        }
   }
})


export const { signInPending, signInSuccess, signInFailure } = userSlice.actions
export default userSlice.reducer


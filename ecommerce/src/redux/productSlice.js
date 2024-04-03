import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: [],
    loading: false,
    error: null
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    productsFetchPending: (state, action) => {
        state.loading = true
    },
    productsFetchSuccess: (state, action) => {
        state.loading = false;
        state.products = action.payload;
        console.log(action.payload)
        state.error = null
    },
    productsFetchFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
  }
})


export const { productsFetchPending, productsFetchSuccess, productsFetchFailure } = productSlice.actions

export default productSlice.reducer
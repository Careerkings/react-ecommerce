import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.id === action.payload.id);
            if(itemIndex >= 0) {
                state.cartItems[itemIndex].quantity++
            }else {
                const temProducts = {...action.payload, quantity: 1};
                state.cartItems.push(temProducts);
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        removeFromCart: (state, action) => {
            const filteredItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            state.cartItems = filteredItems
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        decreaseCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id)
            if(state.cartItems[itemIndex].quantity > 1){
                state.cartItems[itemIndex].quantity--
            }else if(state.cartItems[itemIndex].quantity === 1){
                const filteredItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
                state.cartItems = filteredItems
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        clearCart: (state, action) => {
            state.cartItems = []
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        getTotals: (state, action) => {
           const { cartQuantity, total} = state.cartItems.reduce((cartTotal, cartItem) => {
                const {price, quantity} = cartItem;
                const itemTotal = price * quantity
                
                cartTotal.total += itemTotal;
                cartTotal.cartQuantity += quantity;
                return cartTotal
            }, {
                total: 0,
                cartQuantity: 0
                
            })
            state.cartTotalQuantity = cartQuantity;
            state.cartTotalAmount = total;
        }

    }

})


export const {addToCart, removeFromCart, decreaseCart, getTotals, clearCart} = cartSlice.actions

export default cartSlice.reducer
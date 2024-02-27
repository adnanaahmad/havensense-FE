import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        let index = state.cart.findIndex(item => item.product._id === action.payload.item.product._id);
        if (index < 0) {
            state.cart = [action.payload.item, ...state.cart];
        } else {
            state.cart[index].quantity = state.cart[index].quantity + 1;
        }
    },
    updateCart: (state, action) => {
        state.cart = action.payload.cart;
    },
    removeOneFromCart: (state, action) => {
        let index = state.cart.findIndex(item => item.product._id === action.payload.product._id);
        if (index > -1) {
            if (state.cart[index].quantity === 1) {
                state.cart.splice(index, 1);
            } else if (state.cart[index].quantity > 1) {
                state.cart[index].quantity = state.cart[index].quantity - 1;
            }
        }
    },
    removeFromCart: (state, action) => {
        let index = state.cart.findIndex(item => item.product._id === action.payload.product._id);
        if (index > -1) {
            state.cart.splice(index, 1);
        }
    },
    emptyCart: (state, action) => {
        state.cart = [];
    },

  },
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart, removeOneFromCart, emptyCart } = cartSlice.actions

export default cartSlice.reducer;
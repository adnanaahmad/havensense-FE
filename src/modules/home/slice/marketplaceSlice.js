import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  marketplace: [],
}

export const marketplaceSlice = createSlice({
  name: 'marketplaceSlice',
  initialState,
  reducers: {
    createProduct: (state, action) => {
        state.marketplace = [action.payload.product, ...state.marketplace];
    },
    updateProduct: (state, action) => {
        let index = state.marketplace.findIndex(product => product._id === action.payload.product._id);
        state.marketplace[index] = action.payload.product;
    },    
    updateMarketplace: (state, action) => {
        state.marketplace = action.payload.marketplace;
    },
    // deleteProduct: (state, action) => {
    //     let index = state.marketplace.findIndex(product => product._id === action.payload.id);
    //     if (index > -1) state.marketplace.splice(index, 1);
    // }
  },
})

// Action creators are generated for each case reducer function
export const { createProduct, updateProduct, updateMarketplace } = marketplaceSlice.actions

export default marketplaceSlice.reducer;
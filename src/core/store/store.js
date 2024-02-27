import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../modules/auth/slice/userSlice';
import playByPlayReducer from '../../modules/home/slice/playByPlaySlice';
import profileReducer from '../../modules/home/slice/profileSlice';
import marketplaceReducer from '../../modules/home/slice/marketplaceSlice';
import cartReducer from '../../modules/home/slice/cartSlice';

export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    playByPlaySlice: playByPlayReducer,
    profileSlice: profileReducer,
    marketplaceSlice: marketplaceReducer,
    cartSlice: cartReducer
  },
})
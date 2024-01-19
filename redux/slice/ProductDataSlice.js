import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};
export const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    product: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
  },
});

export const {product} = productSlice.actions;
export default productSlice.reducer;

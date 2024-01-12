import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [1],
};
export const productSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    product: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {product} = productSlice.actions;
export default productSlice.reducer;

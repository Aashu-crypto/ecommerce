import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    product: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {product} = productSlice.actions;
export default productSlice.reducer;

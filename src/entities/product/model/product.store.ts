import { createSlice } from '@reduxjs/toolkit';
import { generateProductId } from '../lib/generate-product-id';
import { IProductState } from './product.types';
import { createProductAsync, deleteProductAsync, getProductsAsync } from './product.actions';
import { PRODUCT_LOCAL_STORAGE_KEY } from '../config/product.constants';

const initialState: IProductState = {
  products: [],
};


export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.products.push({ ...action.payload, id: generateProductId() });
        localStorage.setItem(PRODUCT_LOCAL_STORAGE_KEY, JSON.stringify(state.products));
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
        localStorage.setItem(PRODUCT_LOCAL_STORAGE_KEY, JSON.stringify(state.products));
      })
    ;
  },
});


export const ProductReducer = productSlice.reducer;

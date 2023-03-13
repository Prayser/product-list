import { createSlice } from '@reduxjs/toolkit';
import { generateProductId } from '../lib/generate-product-id';
import { saveProducts } from '../lib/save-products';
import { IProductState } from './product.types';
import { createProductAsync, deleteProductAsync, getProductsAsync, updateProductAsync } from './product.actions';

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
        saveProducts(state.products);
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
        saveProducts(state.products);
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const updateProductIndex = state.products.findIndex(product => product.id === action.payload.id);
        state.products[updateProductIndex] = action.payload;
        saveProducts(state.products);
      })
    ;
  },
});


export const ProductReducer = productSlice.reducer;

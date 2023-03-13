import { createAsyncThunk } from '@reduxjs/toolkit';
import { PRODUCT_LOCAL_STORAGE_KEY } from '../config/product.constants';
import { IProduct, ProductActions } from './product.types';

// FAKE SERVER ========================================================================

export function fakeServerFetchGet() {
  return new Promise<{ data: IProduct[] }>((resolve) =>
    setTimeout(() => resolve({ data: JSON.parse(localStorage.getItem(PRODUCT_LOCAL_STORAGE_KEY) || '[]') as IProduct[] ?? [] }), 2500),
  );
}

export function fakeServerFetchDelete(id: number) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: id }), 2500),
  );
}

export function fakeServerFetchCreate(product: ProductActions) {
  return new Promise<{ data: ProductActions }>((resolve) =>
    setTimeout(() => resolve({ data: product }), 2500),
  );
}

export function fakeServerFetchUpdate(product: IProduct) {
  return new Promise<{ data: IProduct }>((resolve) =>
    setTimeout(() => resolve({ data: product }), 2500),
  );
}


// ACTIONS ============================================================================

export const getProductsAsync = createAsyncThunk('product/get', async () => {
    const response = await fakeServerFetchGet();
    return response.data;
  },
);

export const createProductAsync = createAsyncThunk('product/create', async (product: ProductActions) => {
    const response = await fakeServerFetchCreate(product);
    return response.data;
  },
);

export const updateProductAsync = createAsyncThunk('product/update', async (product: IProduct) => {
    const response = await fakeServerFetchUpdate(product);
    return response.data;
  },
);

export const deleteProductAsync = createAsyncThunk('product/delete', async (id: number) => {
    const response = await fakeServerFetchDelete(id);
    return response.data;
  },
);


import { PRODUCT_LOCAL_STORAGE_KEY } from '../config/product.constants';
import { IProduct } from '../model/product.types';

export const saveProducts = (products: IProduct[]) => {
  localStorage.setItem(PRODUCT_LOCAL_STORAGE_KEY, JSON.stringify(products));
};
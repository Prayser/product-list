import { RootState } from 'shared/lib/redux-toolkit/store';

export const selectProducts = (state: RootState) => state.product.products;

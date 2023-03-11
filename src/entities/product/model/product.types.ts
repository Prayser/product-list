export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
}

export type ProductActions = Omit<IProduct, 'id'>

export interface IProductState {
  products: IProduct[];
}
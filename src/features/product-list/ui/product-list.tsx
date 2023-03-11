import React, { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import cls from './product-list.module.scss';
import { getProductsAsync, ProductCard, selectProducts } from '../../../entities/product';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/redux-toolkit/hooks';
import { Loader } from '../../../shared/ui/loader';

interface ProductListProps {
  search: string;
  className?: string;
}

const ProductList = (props: ProductListProps) => {
  const { className, search } = props;

  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      setIsLoading(true);
      dispatch(getProductsAsync())
        .then(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const filterProducts = useMemo(() =>
      products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()))
    , [products, search]);

  if (isLoading) return <Loader />;

  if (products.length === 0) return <h2>Items not found</h2>;

  return (
    <ul className={clsx(cls.productList, className)}>
      {filterProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default React.memo(ProductList);
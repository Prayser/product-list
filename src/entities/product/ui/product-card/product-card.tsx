import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Button } from 'shared/ui/button';
import { Loader } from 'shared/ui/loader';
import { DeleteButton } from 'shared/ui/delete-button';
import { useAppDispatch } from 'shared/lib/redux-toolkit/hooks';
import { PRODUCT_CARD_DESCRIPTION_LENGTH } from '../../config/product.constants';
import { IProduct } from '../../model/product.types';
import { deleteProductAsync } from '../../model/product.actions';
import { ProductImage } from '../product-image/product-image';
import cls from './product-card.module.scss';

interface ProductCardProps {
  product: IProduct;
  className?: string;
}


export const ProductCard = (props: ProductCardProps) => {
  const { className, product } = props;
  const dispatch = useAppDispatch();

  const description = product.description.length > PRODUCT_CARD_DESCRIPTION_LENGTH ? product.description.slice(0, PRODUCT_CARD_DESCRIPTION_LENGTH) + '...' : product.description;

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(() => {
    setIsLoading(true);
    dispatch(deleteProductAsync(product.id)).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <li className={clsx(cls.productCard, className)}>
      <div className={clsx(cls.productBlock)}>
        <ProductImage size={110} />
      </div>
      <div className={clsx(cls.productDescription)}>
        <Link to={`/product/${product.id}`} className={clsx({ [cls.disabledLink]: isLoading })}><h3>{product.title}</h3>
        </Link>
        <p>{description}</p>
      </div>
      <div className={clsx(cls.productInfo)}>
        <p className={cls.productId}>ID: {product.id}</p>
        <p className={cls.productPrice}>{product.price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        })}</p>
        <div className={cls.buttons}>
          <Button>EDIT</Button>
          <DeleteButton onClick={handleDelete} />
        </div>
        {isLoading && <div className={cls.loader}>
          <Loader />
        </div>}
      </div>
    </li>
  );
};
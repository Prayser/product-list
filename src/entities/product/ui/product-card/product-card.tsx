import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Button } from 'shared/ui/button';
import { DeleteButton } from 'shared/ui/delete-button';
import { PRODUCT_CARD_DESCRIPTION_LENGTH } from '../../config/product.constants';
import { IProduct } from '../../model/product.types';
import { ProductImage } from '../product-image/product-image';
import { ProductDeleteModal } from '../product-delete-modal';
import { ProductUpdateModal } from '../product-update-modal';
import cls from './product-card.module.scss';

interface ProductCardProps {
  product: IProduct;
  className?: string;
}


export const ProductCard = (props: ProductCardProps) => {
  const { className, product } = props;

  const description = product.description.length > PRODUCT_CARD_DESCRIPTION_LENGTH ? product.description.slice(0, PRODUCT_CARD_DESCRIPTION_LENGTH) + '...' : product.description;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  const handleOpenUpdateModal = useCallback(() => {
    setOpenUpdateModal(true);
  }, []);

  const handleCloseUpdateModal = useCallback(() => {
    setOpenUpdateModal(false);
  }, []);

  return (
    <>
      <li className={clsx(cls.productCard, className)}>
        <div className={clsx(cls.productBlock)}>
          <ProductImage size={110} />
        </div>
        <div className={clsx(cls.productDescription)}>
          <Link to={`/product/${product.id}`}>
            <h3>{product.title}</h3>
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
            <Button onClick={handleOpenUpdateModal}>EDIT</Button>
            <DeleteButton onClick={handleOpenDeleteModal} />
          </div>
        </div>
      </li>
      <ProductDeleteModal id={product.id} open={openDeleteModal} onClose={handleCloseDeleteModal} />
      <ProductUpdateModal product={product} open={openUpdateModal} onClose={handleCloseUpdateModal} />
    </>
  );
};
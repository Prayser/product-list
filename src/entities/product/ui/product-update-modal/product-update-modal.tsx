import React, { useState } from 'react';
import { Modal } from 'shared/ui/modal';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { Loader } from 'shared/ui/loader';
import { useAppDispatch } from 'shared/lib/redux-toolkit/hooks';
import { updateProductAsync } from '../../model/product.actions';
import { IProduct } from '../../model/product.types';
import { ProductImage } from '../product-image/product-image';
import cls from './product-update-modal.module.scss';

interface UpdateProductModalProps {
  open: boolean;
  onClose: () => void;
  product: IProduct;
  className?: string;
}

const ProductUpdateModal = (props: UpdateProductModalProps) => {
  const { className, onClose, open, product } = props;

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);


  const [name, setName] = useState(product.title);
  const [price, setPrice] = useState(`${product.price}`);
  const [description, setDescription] = useState(product.description);

  const handleUpdateProductItem = () => {
    setIsLoading(true);
    dispatch(updateProductAsync({ description, price: Number(price) || 0, title: name, id: product.id }))
      .then(() => {
        setIsLoading(false);
        onClose();
      });
  };

  return (
    <Modal id='product-update-modal' open={open} onClose={isLoading ? () => undefined : onClose}
           className={className} title={'Update Item'}>
      <form className={cls.createProductModal}>
        <div className={cls.inputContainer}>
          <ProductImage />
          <div className={cls.inputColumn}>
            <Input onChange={(event) => setName(event.target.value)} disabled={isLoading} value={name}
                   placeholder='Name' />
            <Input onChange={(event) => setPrice(event.target.value)} disabled={isLoading} value={price}
                   placeholder='Price' />
          </div>
        </div>
        <textarea onChange={(event) => setDescription(event.target.value)} value={description} placeholder='Description'
                  className={cls.descriptionArea} disabled={isLoading} />
        <Button type={'button'} disabled={isLoading} onClick={handleUpdateProductItem}>update item</Button>
      </form>
      {isLoading && <Loader />}
    </Modal>
  );
};

export default React.memo(ProductUpdateModal);
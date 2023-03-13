import React, { useState } from 'react';
import { Modal } from 'shared/ui/modal';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { Loader } from 'shared/ui/loader';
import { useAppDispatch } from 'shared/lib/redux-toolkit/hooks';
import { createProductAsync } from '../../model/product.actions';
import { ProductImage } from '../product-image/product-image';
import cls from './product-create-modal.module.scss';

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

const ProductCreateModal = (props: CreateProductModalProps) => {
  const { className, onClose, open } = props;

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);


  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateProductItem = () => {
    setIsLoading(true);
    dispatch(createProductAsync({ description, price: Number(price) || 0, title: name }))
      .then(() => {
        setIsLoading(false);
        onClose();
      });
  };

  return (
    <Modal id='product-create-modal' open={open} onClose={isLoading ? () => undefined : onClose}
           className={className} title={'Create new Item'}>
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
        <textarea onChange={(event) => setDescription(event.target.value)} value={description}
                  placeholder='Description'
                  className={cls.descriptionArea} disabled={isLoading} />
        <Button type={'button'} disabled={isLoading} onClick={handleCreateProductItem}>create item</Button>
      </form>
      {isLoading && <Loader />}
    </Modal>
  );
};

export default React.memo(ProductCreateModal);
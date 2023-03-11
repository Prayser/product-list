import React, { useState } from 'react';
import { Modal } from 'shared/ui/modal';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { Loader } from 'shared/ui/loader';
import { useAppDispatch } from 'shared/lib/redux-toolkit/hooks';
import { createProductAsync } from '../../model/product.actions';
import { ProductImage } from '../product-image/product-image';
import cls from './create-product-modal.module.scss';

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

const CreateProductModal = (props: CreateProductModalProps) => {
  const { className, onClose, open } = props;

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);


  const [name, setName] = useState('Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...');
  const [price, setPrice] = useState('110');
  const [description, setDescription] = useState('Nunc est risus, porta a massa et, efficitur viverra nulla. Nunc sollicitudin sodales nisl in consectetur. Duis elementum felis tristique, maximus elit et, suscipit nulla. Maecenas scelerisque scelerisque urna, ut elementum lorem maximus vitae. Integer in maximus ante. Aliquam nec ante sit amet sem ornare porttitor ut quis nisl. Sed massa lacus, faucibus quis porttitor in, commodo non sapien. Donec sit amet faucibus ex. Sed vitae ipsum eget sem consectetur lobortis vel ac purus. Nullam lacinia lorem orci, maximus ultrices tortor convallis at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean eget semper urna. Etiam lacinia volutpat turpis ut faucibus. Nunc urna lorem, fermentum eget lorem molestie, sodales scelerisque arcu. Donec interdum sem in quam vulputate consectetur. Cras ullamcorper enim nibh, tristique pharetra dui fringilla ut.');

  const handleCreateProductItem = () => {
    setIsLoading(true);
    dispatch(createProductAsync({ description, price: Number(price) || 0, title: name }))
      .then(() => {
        setIsLoading(false);
        onClose();
      });
  };

  return (
    <Modal id='create-product-modal' open={open} onClose={isLoading ? () => undefined : onClose}
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
        <textarea onChange={(event) => setDescription(event.target.value)} value={description} placeholder='Description'
                  className={cls.descriptionArea} disabled={isLoading} />
        <Button type={'button'} disabled={isLoading} onClick={handleCreateProductItem}>create item</Button>
      </form>
      {isLoading && <div className={cls.loader}>
        <Loader/>
      </div>}
    </Modal>
  );
};

export default React.memo(CreateProductModal);
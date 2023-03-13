import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { Modal } from 'shared/ui/modal';
import { Button } from 'shared/ui/button';
import { Loader } from 'shared/ui/loader';
import { useAppDispatch } from 'shared/lib/redux-toolkit/hooks';
import { deleteProductAsync } from '../../model/product.actions';
import cls from './product-delete-modal.module.scss';

interface ProductDeleteModalProps {
  id: number;
  open: boolean;
  onClose: () => void;
  callback?: () => void;
  className?: string;
}

const ProductDeleteModal = (props: ProductDeleteModalProps) => {
  const { className, open, onClose, id, callback } = props;

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(() => {
    setIsLoading(true);
    dispatch(deleteProductAsync(id))
      .then(() => {
        setIsLoading(false);
        onClose();
        if (callback) callback();
      });
  }, [id, callback]);

  return (
    <Modal id={'product-delete-modal'} open={open} className={clsx(cls.productDeleteModal, className)}>
      <h3>Are you sure you want to delete this item?</h3>
      <p>You will not be able to restore it. </p>
      <div className={cls.buttons}>
        <Button onClick={onClose} variant={'outlined'}>cancel</Button>
        <Button onClick={handleDelete}>delete item</Button>
      </div>
      {isLoading && <Loader />}
    </Modal>
  );
};

export default React.memo(ProductDeleteModal);
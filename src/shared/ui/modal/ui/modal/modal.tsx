import React from 'react';
import clsx from 'clsx';
import { Portal } from '../../lib/create-portal';
import { ReactComponent as CloseIcon } from '../../assets/close_icon.svg';
import cls from './modal.module.scss';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  id?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Modal = (props: ModalProps) => {
  const { className, open, children, id, title, onClose } = props;
  return open ? (
    <Portal id={id || 'modal-root'}>
      <div
        className={clsx(
          cls.modal,
          className,
        )}
      >
        <div className={cls.modalBackground} />
        <div className={cls.modalContainer}>
          <h3 className={cls.modalTitle}>{title}</h3>
          <button className={cls.modalCloseButton} onClick={onClose}><CloseIcon /></button>
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};

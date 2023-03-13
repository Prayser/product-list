import React, { useLayoutEffect } from 'react';
import clsx from 'clsx';
import { Portal } from '../../lib/create-portal';
import { ReactComponent as CloseIcon } from '../../assets/close_icon.svg';
import cls from './modal.module.scss';

interface ModalProps {
  open: boolean;
  id?: string;
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Modal = (props: ModalProps) => {
  const { className, open, children, id, title, onClose } = props;

  useLayoutEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (open) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    return () => {
      body.style.overflow = 'auto';
    };
  }, [open]);

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
          {title && <h3 className={cls.modalTitle}>{title}</h3>}
          {onClose && <button className={cls.modalCloseButton} onClick={onClose}><CloseIcon /></button>}
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};

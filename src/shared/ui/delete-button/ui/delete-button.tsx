import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Button } from '../../button';
import { ReactComponent as DeleteIcon } from '../assets/delete_icon.svg';
import cls from './delete-button.module.scss';

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const DeleteButton = (props: DeleteButtonProps) => {
  const { className, ...other } = props;
  return (
    <Button className={clsx(cls.deleteButton, className)} {...other} > <DeleteIcon /> </Button>
  );
};
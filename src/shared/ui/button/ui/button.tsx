import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import cls from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'filled' | 'outlined';
  className?: string;
}

export const Button = (props: ButtonProps) => {
  const { children, className, variant = 'filled', ...other } = props;
  return (
    <button className={clsx(cls.button, {
      [cls.filledButton]: variant === 'filled',
      [cls.outlinedButton]: variant === 'outlined',
    }, className)} {...other}>
      {children}
    </button>
  );
};
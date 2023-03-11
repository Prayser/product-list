import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import cls from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  leftContent?: React.ReactNode
  className?: string;
}

export const Input = (props: InputProps) => {
  const { className, leftContent, ...other } = props;
  return (
    <div className={clsx(cls.input, className)}>
      {leftContent}
      <input {...other}/>
    </div>
  );
};
import React from 'react';
import clsx from 'clsx';
import { ReactComponent as LoaderIcon } from '../assets/loader_icon.svg';
import cls from './loader.module.scss';

interface LoaderProps {
  className?: string;
}

export const Loader = (props: LoaderProps) => {
  const { className } = props;
  return (
    <div className={clsx(cls.loader, className)}>
      <LoaderIcon  />
    </div>
  );
};
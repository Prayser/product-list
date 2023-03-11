import React from 'react';
import clsx from 'clsx';
import { ReactComponent as ImageIcon } from '../../assets/image_icon.svg';
import cls from './product-image.module.scss';

interface ImageContainerProps {
  size?: number;
  className?: string;
}

export const ProductImage = (props: ImageContainerProps) => {
  const { className, size = 100 } = props;
  return (
    <div style={{ width: size, height: size }}
         className={clsx(cls.imageContainer, className)}>
      <ImageIcon />
    </div>
  );
};
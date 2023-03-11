import React from 'react';
import clsx from 'clsx';
import cls from './header.module.scss';

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header = (props: HeaderProps) => {
  const { className, children } = props;
  return (
    <header className={clsx(cls.header, className)}>
      <h1 className={cls.headerTitle}>Test homework</h1>
      {children}
    </header>
  );
};

export default React.memo(Header)
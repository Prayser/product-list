import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import { Input } from '../../input';
import { ReactComponent as SearchIcon } from '../assets/search_icon.svg';
import cls from './search-input.module.scss';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const SearchInput = (props: SearchInputProps) => {
  const { className, ...other } = props;
  return (
    <Input id='search-input' className={clsx(cls.searchInput, className)}
           leftContent={<label htmlFor='search-input'> <SearchIcon /> </label>}
           placeholder='Search'
           {...other}
    />
  );
};
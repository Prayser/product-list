import React, { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import { ProductList } from 'features/product-list';
import { CreateProductModal } from 'entities/product';
import { Header } from 'shared/ui/header';
import { SearchInput } from 'shared/ui/search-input';
import { Button } from 'shared/ui/button';
import cls from './main.module.scss';
import { useDebounce } from '../../../shared/lib/hooks/useDebounce';


const Main = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const searchDebounce = useDebounce<string>(search);

  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearch(searchParam);
    }
  }, []);

  useEffect(() => {
    setSearchParams({ search: searchDebounce });
  }, [searchDebounce]);

  const handleOpenCreateModal = useCallback(() => {
    setOpenCreateModal(true);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setOpenCreateModal(false);
  }, []);


  return (
    <>
      <Header>
        {useMemo(() => (
          <SearchInput value={search} onChange={(event) => {
            setSearch(event.target.value);
          }} />), [search])}
      </Header>
      <main className={clsx(cls.mainPage)}>
        <div className={cls.titleContainer}>
          <h1>Items list</h1>
          <div className={cls.titleButtonsContainer}>
            <Button variant='outlined'>Export as .xls</Button>
            <Button onClick={handleOpenCreateModal}>create item</Button>
          </div>
        </div>
        <ProductList search={searchDebounce} />
      </main>
      <CreateProductModal open={openCreateModal} onClose={handleCloseCreateModal} />
    </>
  );
};

export default Main;
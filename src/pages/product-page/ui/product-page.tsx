import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import {
  getProductsAsync,
  selectProducts,
  ProductImage,
  ProductDeleteModal,
  ProductUpdateModal,
} from 'entities/product';
import { Header } from 'shared/ui/header';
import { Button } from 'shared/ui/button';
import { Loader } from 'shared/ui/loader';
import { DeleteButton } from 'shared/ui/delete-button';
import { useAppDispatch, useAppSelector } from 'shared/lib/redux-toolkit/hooks';
import cls from './product-page.module.scss';

interface ProductPageProps {
  className?: string;
}

const ProductPage = (props: ProductPageProps) => {
  const { className } = props;
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [init, setInit] = useState(false);
  const products = useAppSelector(selectProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);


  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products.length === 0 && !isLoading) {
      setIsLoading(true);
      dispatch(getProductsAsync())
        .then(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const product = useMemo(() => {
    const res = products.find(item => item.id === +id);
    setInit(true);
    return res;
  }, [products, id]);

  const handleBack = useCallback(() => {
    navigate('/');
  }, []);

  const handleOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false);
  }, []);

  const handleOpenUpdateModal = useCallback(() => {
    setOpenUpdateModal(true);
  }, []);

  const handleCloseUpdateModal = useCallback(() => {
    setOpenUpdateModal(false);
  }, []);

  return (
    <>
      <Header />
      <main className={clsx(cls.productPage, className)}>
        <div className={cls.title}>
          <Button onClick={handleBack} variant='outlined'>{'< Back'}</Button>
          <h1>Current item</h1>
        </div>
        {(!isLoading && init)
          ? <section className={cls.productSection}>
            {product
              ? <>
                <div className={cls.leftContent}>
                  <ProductImage size={300} />
                  <div className={cls.leftContentFooter}>
                    <div className={cls.buttons}>
                      <Button onClick={handleOpenUpdateModal}>EDIT</Button>
                      <DeleteButton onClick={handleOpenDeleteModal} />
                    </div>
                    <p className={cls.productPrice}>{product.price.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    })}</p>
                  </div>
                </div>
                <div className={cls.rightContent}>
                  <p className={cls.productId}>ID: {product.id}</p>
                  <h2 className={cls.productTitle}>{product.title}</h2>
                  <p className={cls.productDescription}>{product.description}</p>
                </div>
              </>
              : <h1>NOPE</h1>}
          </section>
          : <Loader />}
      </main>
      {product && <ProductDeleteModal id={product.id} open={openDeleteModal} onClose={handleCloseDeleteModal}
                                      callback={handleBack} />}
      {product && <ProductUpdateModal product={product} open={openUpdateModal} onClose={handleCloseUpdateModal} />}
    </>
  );
};

export default ProductPage;
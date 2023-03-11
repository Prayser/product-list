import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Main } from 'pages/main';
import { ProductPage } from 'pages/product-page';
import { Loader } from 'shared/ui/loader';


export const RouterProvider = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
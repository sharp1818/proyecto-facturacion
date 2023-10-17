import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Home from '../pages/home/Home';
import Login from '../pages/login/login/Login';
import NewUser from '../pages/login/new-user/NewUser';
import ProductList from '../pages/products/productList/ProductList';
import ProductCard from '../pages/products/productCard/ProductCard';


const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:collectionName" element={<ProductList />} />
      {/* <Route path="/product/:productName" element={<ProductCard />} /> */}
      {!isAuthenticated && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/new-user" element={<NewUser />} />
        </>
      )}
      {isAuthenticated && (
        <>
          <Route path="/product/:productName" element={<ProductCard />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
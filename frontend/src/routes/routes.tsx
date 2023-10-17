import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Home from '../pages/home/Home';
import Login from '../pages/login/login/Login';
import NewUser from '../pages/login/new-user/NewUser';
import User from '../pages/user/User';
import Products from '../pages/user/products/Products';
import FamilyProducts from '../pages/user/familyProducts/FamilyProducts';
import Invoices from '../pages/user/invoices/Invoices';

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
  
      {/* <Route path="/product/:productName" element={<ProductCard />} /> */}
      {!isAuthenticated && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/new-user" element={<NewUser />} />
        </>
      )}
      {isAuthenticated && (
        <>
          <Route path="/" element={<User />}>
            <Route path="/products" element={<Products />} />
            <Route path="/family-products" element={<FamilyProducts />} />
            <Route path="/invoices" element={<Invoices />} />
          </Route>
        </>
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
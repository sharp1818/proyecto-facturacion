import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import Home from '../pages/home/Home';
import Login from '../pages/login/login/Login';
import NewUser from '../pages/login/new-user/NewUser';
import User from '../pages/user/User';
import FamilyProducts from '../pages/user/familyProducts/@container/FamilyProducts';
import FamilyProductsNewItem from '../pages/user/familyProducts/newItem/FamilyProductsNewItem';
import Products from '../pages/user/products/@container/Products';
import ProductsNewItem from '../pages/user/products/newItem/ProductsNewItem';
import Invoices from '../pages/user/invoices/@container/Invoices';
import InvoicesNewItem from '../pages/user/invoices/newItem/InvoicesNewItem';
import Invoicing from '../pages/user/invoicing/@container/Invoicing';
import InvoicingNewItem from '../pages/user/invoicing/newItem/InvoicingNewItem';

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
  
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
            <Route path="/products/newItem" element={<ProductsNewItem />} />
            <Route path="/products/:id" element={<ProductsNewItem />} />
            <Route path="/family-products" element={<FamilyProducts />} />
            <Route path="/family-products/newItem" element={<FamilyProductsNewItem />} />
            <Route path="/family-products/:id" element={<FamilyProductsNewItem />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/invoices/newItem" element={<InvoicesNewItem />} />
            <Route path="/invoicing" element={<Invoicing />} />
            <Route path="/invoicing/newItem" element={<InvoicingNewItem />} />
          </Route>
        </>
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
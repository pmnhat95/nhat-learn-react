import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout, theme } from 'antd';
import HomePage from '../pages/Home/HomePage';
import ProductListPage from '../pages/Product/ProductList';
import ProductDetailPage from '../pages/Product/ProductDetail';
import CartPage from '../pages/Cart/CartPage';
import CheckoutPage from '../pages/Checkout/CheckoutPage';
import AppBreadcrumb from './Breadcrumb';

const { Content } = Layout;

const ROUTES = [
  { path: '/', element: <HomePage /> },
  { path: '/product', element: <ProductListPage /> },
  { path: '/product/:id', element: <ProductDetailPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/checkout', element: <CheckoutPage /> },
];

const TITLES = {
  '/': 'Home Page',
  '/product': 'Product List',
  '/product/': 'Product Detail',
  '/cart': 'Cart',
  '/checkout': 'Checkout',
};

const getTitleForPath = (pathname) => {
  if (TITLES[pathname]) return TITLES[pathname];
  return "Nhat's Store";
};

const AppContent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { pathname } = useLocation();

  useEffect(() => {
    document.title = getTitleForPath(pathname);
  }, [pathname]);

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      <AppBreadcrumb />
      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Content>
  );
};

export default AppContent;
import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HomeOutlined, ShopOutlined, ShoppingCartOutlined, CreditCardOutlined } from '@ant-design/icons';

const AppBreadcrumb = () => {
  const location = useLocation();
  const { pathname } = location;
  const { detail } = useSelector(state => state.products);

  const getBreadcrumbItems = () => {
    const items = [
      {
        title: (
          <Link to="/">
            <HomeOutlined /> Trang chủ
          </Link>
        ),
      },
    ];

    // Add breadcrumb items based on current path
    if (pathname === '/') {
      return items;
    }

    if (pathname.startsWith('/product')) {
      items.push({
        title: (
          <Link to="/product">
            <ShopOutlined /> Sản phẩm
          </Link>
        ),
      });

      // If it's a product detail page
      if (pathname.includes('/product/') && pathname !== '/product') {
        items.push({
          title: detail ? detail.title : 'Chi tiết sản phẩm',
        });
      }
    }

    if (pathname === '/cart') {
      items.push({
        title: (
          <Link to="/cart">
            <ShoppingCartOutlined /> Giỏ hàng
          </Link>
        ),
      });
    }

    if (pathname === '/checkout') {
      items.push({
        title: (
          <Link>
            <CreditCardOutlined /> Thanh toán
          </Link>
        ),
      });
    }

    return items;
  };

  return (
    <Breadcrumb
      style={{ marginBottom: 16 }}
      items={getBreadcrumbItems()}
    />
  );
};

export default AppBreadcrumb; 
import React from 'react';
import { Layout, Menu, Badge, Divider, Typography } from 'antd';
import { ShoppingCartOutlined, HomeOutlined, ShopOutlined, CreditCardOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { cartCountSelector } from '../store/selectors';

const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();
  const cartCount = useSelector(cartCountSelector);
  const menuItems = [
    {
      key: '/product',
      icon: <ShopOutlined />,
      label: <Link to="/product">Sản phẩm</Link>,
    },
    {
      key: '/checkout',
      icon: <CreditCardOutlined />,
      label: <Link to="/checkout">Thanh toán</Link>,
    },
  ];

  return (
    <Header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 0,
    }}>
      <Link
        to="/"
        style={{
          fontWeight: 600,
          fontSize: 18,
          color: '#1890ff',
          textDecoration: 'none',
          padding: '0 40px'
        }}
      >
        <HomeOutlined style={{ fontSize: 22, marginRight: 6 }} />
        <Typography.Text style={{ color: '#1890ff', fontWeight: 600, fontSize: 18 }}>Trang chủ</Typography.Text>
      </Link>
      <Divider type="vertical" style={{marginRight: '40px'}} />
      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ flex: 1, minWidth: 0 }}
      />
      <Link
        type="text"
        style={{marginRight: 40}}
        to="/cart"
      >
        <Badge count={cartCount} size="small" offset={[5, -3]}>
          <ShoppingCartOutlined />
        </Badge>
      </Link>
    </Header>
  );
};

export default AppHeader;
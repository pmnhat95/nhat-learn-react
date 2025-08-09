import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, List, Button, Typography, Divider } from 'antd';
import { clearCart } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function CheckoutPage() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Xử lý đơn hàng tại đây (gửi lên BE nếu cần)
    dispatch(clearCart());
    alert('🛒 Đặt hàng thành công!');
    navigate('/');
  };

  return (
    <Card title="Xác nhận đơn hàng" style={{ maxWidth: 600, margin: '0 auto', marginTop: 32 }}>
      <List
        dataSource={cartItems}
        renderItem={item => (
          <List.Item>
            <div style={{ flex: 1 }}>
              <Text strong>{item.title}</Text>
              <br />
              <Text type="secondary">Số lượng: {item.quantity}</Text>
            </div>
            <Text>${(item.price * item.quantity).toFixed(2)}</Text>
          </List.Item>
        )}
      />
      <Divider />
      <div style={{ textAlign: 'right' }}>
        <Title level={4}>Tổng: ${total.toFixed(2)}</Title>
        <Button type="primary" onClick={handleCheckout}>Đặt hàng</Button>
      </div>
    </Card>
  );
};
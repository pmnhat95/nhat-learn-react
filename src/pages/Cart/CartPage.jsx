import { Button, Table, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeFromCart } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import { cartListSelector, cartTotalSelector } from '../../store/selectors';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartListSelector);
  const cartTotal = useSelector(cartTotalSelector);

  const columns = [
    {
      title: 'Ảnh',
      dataIndex: 'image',
      render: (src) => <Image width={50} src={src} />
    },
    {
      title: 'Tên',
      dataIndex: 'title'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (_, record) => (
        <>
          <Button onClick={() => dispatch(decreaseQty(record.id))}>-</Button>
          <span style={{ margin: '0 10px' }}>{record.quantity}</span>
          <Button onClick={() => dispatch(increaseQty(record.id))}>+</Button>
        </>
      )
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (price) => `$${price}`
    },
    {
      title: 'Thành tiền',
      render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`
    },
    {
      title: '',
      render: (_, record) => (
        <Button danger onClick={() => dispatch(removeFromCart(record.id))}>
          Xóa
        </Button>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Giỏ hàng</h1>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={cartItems}
        pagination={false}
      />
      <h2 style={{ marginTop: 20 }}>Tổng cộng: ${cartTotal}</h2>
      <Link to="/checkout">
        <Button type="primary">Tiến hành thanh toán</Button>
      </Link>
    </div>
  );
}
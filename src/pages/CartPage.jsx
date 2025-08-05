import { Button, Table, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeFromCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  console.log(items)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

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
        dataSource={items}
        pagination={false}
      />
      <h2 style={{ marginTop: 20 }}>Tổng cộng: ${total}</h2>
      <Link to="/checkout">
        <Button type="primary">Tiến hành thanh toán</Button>
      </Link>
    </div>
  );
}
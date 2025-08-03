import ProductList from '../components/ProductList';
import { Typography } from 'antd';

export default function ProductsPage() {
  return (
    <div>
      <Typography.Title level={2}>All Products</Typography.Title>
      <ProductList />
    </div>
  );
}
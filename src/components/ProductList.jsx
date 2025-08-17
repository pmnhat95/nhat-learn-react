import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Pagination } from 'antd';
import { getProducts } from '../store/productsSlice';
import { productCountSelector } from '../store/selectors';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './Skeleton/ProductCardSkeleton';

export default function ProductList() {
  const dispatch = useDispatch();
  const { items, itemsLoading } = useSelector(state => state.products);
  const productCount = useSelector(productCountSelector);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const onChange = (page, size) => {
    setCurrentPage(page);
    if (size !== pageSize) {
      setPageSize(size);
      setCurrentPage(1);
    }
  };

  const onShowSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Calculate paginated items
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedItems = items.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (itemsLoading) return <ProductCardSkeleton />;

  return (
    <div>
      <Row gutter={[16, 16]}>
        {paginatedItems.map(product => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      <Row style={{ marginTop: 24, justifyContent: 'center' }}>
        <Pagination 
          current={currentPage}
          pageSize={pageSize}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          total={productCount}
          showSizeChanger
        />
      </Row>
    </div>
  );
}
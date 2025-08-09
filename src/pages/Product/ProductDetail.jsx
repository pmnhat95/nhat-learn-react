import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Typography, Row, Col, Image, Button, Space, message } from "antd";
import { addToCart } from "../../store/cartSlice";
import { getProductDetail, clearProductDetail } from '../../store/productsSlice';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail, detailLoading, detailError } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProductDetail(id));
    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (detailError) message.error(detailError);
  }, [detailError]);

  if (detailLoading) return <Spin size="large" />

  if (!detail) return <Typography.Text>Sản phẩm không tồn tại.</Typography.Text>

  return (
    <Row gutter={32}>
      <Col xs={24} md={12}>
        <Image src={detail.image} alt={detail.title} style={{ maxHeight: 400 }} />
      </Col>
      <Col xs={24} md={12}>
      <Space direction="vertical" size="middle">
          <Typography.Title level={3}>{detail.title}</Typography.Title>
          <Typography.Text strong style={{ fontSize: 18 }}>${detail.price}</Typography.Text>
          <Typography.Paragraph>{detail.description}</Typography.Paragraph>
          <Button type="primary" onClick={() => dispatch(addToCart(detail))}>
            Add to Cart
          </Button>
          <Link to={`/cart`}>Cart Page</Link>
        </Space>
      </Col>
    </Row>
  )
}
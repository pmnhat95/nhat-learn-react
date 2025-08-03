import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Spin, Typography, Row, Col, Image, Button, Space } from "antd";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.products);
  const product = items.find(product => product.id === Number(id));

  if (loading) return <Spin size="large" />

  if (!product) return <Typography.Text>Sản phẩm không tồn tại.</Typography.Text>

  return (
    <Row gutter={32}>
      <Col xs={24} md={12}>
        <Image src={product.image} alt={product.title} style={{ maxHeight: 400 }} />
      </Col>
      <Col xs={24} md={12}>
      <Space direction="vertical" size="middle">
          <Typography.Title level={3}>{product.title}</Typography.Title>
          <Typography.Text strong style={{ fontSize: 18 }}>${product.price}</Typography.Text>
          <Typography.Paragraph>{product.description}</Typography.Paragraph>
          <Button type="primary" onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </Button>
        </Space>
      </Col>
    </Row>
  )
}
import { Row, Col, Skeleton, Space } from "antd";

export default function ProductDetailSkeleton() {
  return (
    <Row gutter={32}>
      <Col xs={24} md={12}>
        <style>
          {`
            .custom-skeleton-image {
              width: 100% !important;
            }
          `}
        </style>
        <Skeleton.Image 
          active 
          block 
          style={{ minHeight: 400 }} 
          className="custom-skeleton-image"
        />
      </Col>
      <Col xs={24} md={12}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Skeleton.Input active size="large" block style={{ height: 40 }} />
          <Skeleton.Input active size="default" style={{ width: 100, height: 24 }} />
          <Skeleton paragraph={{ rows: 3, width: ['100%', '90%', '80%'] }} active />
          <Skeleton.Button active style={{ width: 200, height: 40, marginTop: 10 }} />
        </Space>
      </Col>
    </Row>
  );
}
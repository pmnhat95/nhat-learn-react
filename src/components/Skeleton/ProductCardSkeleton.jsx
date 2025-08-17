import { Row, Col, Card, Skeleton } from "antd";

export default function ProductCardSkeleton() {
  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: 10 }).map((_, idx) => (
        <Col key={idx} xs={24} sm={12} md={8} lg={6}>
          <Card cover={<Skeleton.Image active style={{ width: '100%', height: 200, objectFit: 'contain', padding: 10 }} />}
            style={{ marginBottom: 20 }}
          >
            <Card.Meta title={<Skeleton.Input active size="small" />} description={<Skeleton.Input active size="small" />}
            ></Card.Meta>
            
            <Skeleton.Button active style={{ marginTop: 10 }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
import { Card, Button } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { title, price, image } = product;

  return (
    <Card cover={<img alt={title} src={image} style={{ height: 200, objectFit: 'contain', padding: 10 }}></img>}
      style={{ marginBottom: 20 }}
    >
      <Card.Meta title={<Link to={`/product/${product.id}`}>{title}</Link>} description={`$${price}`}
      ></Card.Meta>
      <Button
        type="primary"
        onClick={() => dispatch(addToCart(product))}
        style={{ marginTop: 10 }}
      >
        Add to Cart
      </Button>
    </Card>
  );
}
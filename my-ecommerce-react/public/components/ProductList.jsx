import { products } from "../products";
import ProductCard from "./ProductCard";

export default function ProductList({ addToCart }) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}
import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import "./App.css";

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="storefront">
      <nav className="navbar">
        <a className="brand" href="#products">My Store</a>
        <button className="cart-toggle" type="button" onClick={() => setIsCartOpen(!isCartOpen)} aria-expanded={isCartOpen}>
          Cart <span className="cart-count">{totalItemsCount}</span>
        </button>
      </nav>

      {isCartOpen && <Cart cart={cart} removeFromCart={removeFromCart} />}

      <main>
        <section className="intro">
          <p className="eyebrow">Simple things for everyday life</p>
          <h1>Shop useful.<br /><span>Live simply.</span></h1>
          <p className="intro-copy">A small collection of practical products at honest prices.</p>
        </section>
        <section className="products-section" id="products" aria-labelledby="products-title">
          <div className="section-heading">
            <h2 id="products-title">Products</h2>
            <span>8 items</span>
          </div>
          <ProductList addToCart={addToCart} />
        </section>
        <CheckoutForm />
      </main>
      <footer>My Store · Everyday essentials</footer>
    </div>
  );
}
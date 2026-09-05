function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`
}

function Cart({ cart, removeFromCart }) {
  const grandTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

  return (
    <section className="cart-panel" aria-labelledby="cart-title">
      <div className="section-heading"><div><p className="eyebrow">Your selection</p><h2 id="cart-title">Shopping cart</h2></div></div>
      {cart.length === 0 ? <p className="empty-cart">Your cart is empty</p> : <>
        <div className="cart-items">
          {cart.map(({ product, quantity }) => <div className="cart-item" key={product.id}>
            <img src={product.image} alt="" /><div><h3>{product.name}</h3><p>{quantity} × {formatPrice(product.price)}</p></div>
            <strong>{formatPrice(product.price * quantity)}</strong>
            <button type="button" className="remove-button" onClick={() => removeFromCart(product.id)}>Remove</button>
          </div>)}
        </div>
        <div className="cart-total"><span>Grand total</span><strong>{formatPrice(grandTotal)}</strong></div>
      </>}
    </section>
  )
}

export default Cart
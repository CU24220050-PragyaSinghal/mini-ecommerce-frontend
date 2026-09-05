export default function Cart({ cart, removeFromCart }) {
  if (cart.length === 0) {
    return <p>Your cart is empty</p>;
  }

  const grandTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", margin: "10px 0" }}>
      <h2>Your Cart</h2>
      <table style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.product.id}>
              <td>{item.product.name}</td>
              <td>₹{item.product.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.product.price * item.quantity}</td>
              <td>
                <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Grand Total: ₹{grandTotal}</h3>
    </div>
  );
}
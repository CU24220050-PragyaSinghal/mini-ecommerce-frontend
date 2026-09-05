import { useState } from "react";

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    phone: "",
    paymentMethod: "COD"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", marginTop: "20px" }}>
      <h2>Checkout</h2>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
      <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
        <option value="COD">Cash on Delivery</option>
        <option value="Online">Online Payment</option>
      </select>
      <button type="submit">Place Order</button>
    </form>
  );
}
import { useState } from 'react'

function CheckoutForm() {
  const [form, setForm] = useState({ name: '', address: '', pincode: '', phone: '', payment: 'UPI' })
  const [submitted, setSubmitted] = useState(false)

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setSubmitted(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="checkout" aria-labelledby="checkout-title">
      <div><p className="eyebrow">Almost there</p><h2 id="checkout-title">Checkout</h2><p>Tell us where to send your order.</p></div>
      <form onSubmit={handleSubmit}>
        <label>Name<input name="name" value={form.name} onChange={updateField} required /></label>
        <label>Address<textarea name="address" value={form.address} onChange={updateField} required rows="2" /></label>
        <div className="form-row"><label>Pincode<input name="pincode" value={form.pincode} onChange={updateField} inputMode="numeric" pattern="[0-9]{6}" required /></label><label>Phone<input name="phone" value={form.phone} onChange={updateField} inputMode="tel" pattern="[0-9]{10}" required /></label></div>
        <label>Payment method<select name="payment" value={form.payment} onChange={updateField}><option>UPI</option><option>Card</option><option>Cash on delivery</option></select></label>
        <button className="submit-button" type="submit">Place order <span aria-hidden="true">→</span></button>
        {submitted && <p className="confirmation" role="status">Thanks, {form.name || 'there'}! Your order is ready to process.</p>}
      </form>
    </section>
  )
}

export default CheckoutForm
function ProductCard({ product, addToCart }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <div><h3>{product.name}</h3><p className="price">₹{product.price.toLocaleString('en-IN')}</p></div>
        <button className="add-button" type="button" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </article>
  )
}

export default ProductCard
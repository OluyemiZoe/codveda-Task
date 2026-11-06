import React from 'react';

export default function ProductItem({ product, onDelete }) {
  
  const formattedPrice = typeof product.price === 'number' 
    ? product.price.toFixed(2) 
    : '0.00';

  return (
    <div className="product-item">
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="text-muted">
          Price: ${formattedPrice} | Stock: {product.stock || 0} units
        </p>
      </div>
      
      <button className="btn btn-danger" onClick={() => onDelete(product._id)}>
        Delete
      </button>
    </div>
  );
}

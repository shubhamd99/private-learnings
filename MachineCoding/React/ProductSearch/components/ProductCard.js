import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <strong>${product.price}</strong>
    </div>
  );
}

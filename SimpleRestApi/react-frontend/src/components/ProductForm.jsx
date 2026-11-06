import React, { useState } from 'react';

export default function ProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const API_BASE_URL = '/api/products';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
    };

    try {
      
      const token = localStorage.getItem('token');

      
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Action Denied: Your profile lacks admin creation privileges.');
        }
        throw new Error('Could not add product.');
      }

      
      setName('');
      setPrice('');
      setStock('');
      
      
      onProductAdded(); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <section className="card form-card">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g. Enter Product Name"
          />
        </div>
        <div className="form-group">
          <label>Price ($)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="0.00"
          />
        </div>
        <div className="form-group">
          <label>Stock Quantity</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            placeholder="0"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductItem from './components/ProductItem';
import Login from './components/Login'; 
import './App.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const API_BASE_URL = '/api/products';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const currentToken = localStorage.getItem('token');

      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch store inventory.');
      }

      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to remove this product?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Action Denied: Your profile lacks admin deletion permissions.');
        }
        throw new Error('Deletion request rejected.');
      }

      fetchProducts(); 
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setProducts([]);
    setError(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1> Product Catalog </h1>
          <p>Manage inventory.</p>
        </div>
        <button className="btn btn-danger" onClick={handleLogout} style={{ height: 'fit-content' }}>
          Logout
        </button>
      </header>

      <main className="dashboard-grid">
        <ProductForm onProductAdded={fetchProducts} />

        <section className="card list-card">
          <h2>Current Inventory</h2>
          
          {loading && <div className="text-muted">Fetching live inventory catalog...</div>}
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>Error: {error}</div>}
          
          {!loading && !error && Array.isArray(products) && products.length === 0 && (
            <p className="text-muted">No items found in your catalog.</p>
          )}

          {!loading && (
            <div className="product-grid-display">
              {Array.isArray(products) ? (
                products.map((product) => (
                  <ProductItem
                    key={product._id}
                    product={product}
                    onDelete={handleDeleteProduct}
                  />
                ))
              ) : (
                <div style={{ color: 'red', marginTop: '10px' }}>
                   Access Intercepted: {products?.error || 'Expected data collection array layer.'}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

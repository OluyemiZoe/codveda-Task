import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      
      alert(`Welcome back, ${data.user.username}! Role: ${data.user.role}`);
      
      
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card form-card login-card" style={{ maxWidth: '400px', margin: '20px auto' }}>
      <h2>Admin Dashboard Login</h2>
      <p className="text-muted">Authenticate to unlock item additions and catalog deletions.</p>
      
      {error && <div style={{ color: 'red', marginBottom: '15px' }}> {error}</div>}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Admin Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="e.g. admin_zoe"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Authenticating...' : 'Login to Dashboard'}
        </button>
      </form>
    </section>
  );
}

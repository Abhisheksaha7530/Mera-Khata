
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setToken }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegister) {
        await axios.post('http://localhost:5000/api/auth/register', {
          name,
          email,
          password,
        });
        alert('🎉 Registration successful! Please log in.');
        setIsRegister(false);
      } else {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        });
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? (isRegister ? 'Registering...' : 'Logging in...') : isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      {!isRegister && (
        <p style={{ marginTop: '10px' }}>
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
      )}

      <p style={{ marginTop: '15px' }}>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setError('');
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'blue',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {isRegister ? 'Login here' : 'Register here'}
        </button>
      </p>
    </div>
  );
}

export default Login;

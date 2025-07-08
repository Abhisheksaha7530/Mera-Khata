
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message);
      setMessageType('success');
      setEmail('');
      inputRef.current?.focus();
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to send email');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Forgot Password</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          ref={inputRef}
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      {message && (
        <p
          style={{
            ...styles.message,
            color: messageType === 'success' ? 'green' : 'red',
          }}
        >
          {message}
        </p>
      )}

      {/* 👇 Back to Login link */}
      <p style={styles.loginLink}>
        <Link to="/login" style={{ color: '#007bff', textDecoration: 'underline' }}>
          🔙 Back to Login
        </Link>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '60px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  form: {
    marginTop: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #aaa',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: '20px',
  },
};

export default ForgotPassword;

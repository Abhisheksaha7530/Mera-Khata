

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setError('');

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMsg(res.data.message);
      setResetSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <p style={{ color: 'red' }}>❌ Invalid or missing token in URL.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: '1rem' }}>🔒 Reset Your Password</h2>

      {!resetSuccess ? (
        <form onSubmit={handleReset} style={styles.form}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      ) : (
        <div style={{ marginTop: '1rem' }}>
          <p style={{ color: 'green' }}>{msg}</p>
          <button style={styles.button} onClick={() => navigate('/login')}>
            Go to Login
          </button>
        </div>
      )}

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    maxWidth: '400px',
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    marginTop: '1rem',
  },
};

export default ResetPassword;

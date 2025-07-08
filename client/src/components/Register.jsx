import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      alert('Account created! Please login.');
      navigate('/');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Create Account</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
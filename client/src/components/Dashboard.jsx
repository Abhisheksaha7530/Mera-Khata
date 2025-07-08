

import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../App.css';

function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ customer: '', item: '', quantity: '', price: '' });

  const token = localStorage.getItem('token'); // ✅ Get token from localStorage

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/entries', {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Correct format
      });
      setEntries(res.data);
    } catch (err) {
      console.error('Error fetching entries:', err);
      alert('⚠️ Please log in again.');
      window.location.href = '/login'; // optional redirect
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.customer.trim() || !form.item.trim() || !form.quantity || !form.price) {
      alert('⚠️ Please fill in all fields before submitting.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/entries', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ customer: '', item: '', quantity: '', price: '' });
      fetchEntries();
    } catch (error) {
      console.error('❌ Error adding entry:', error);
      alert('Failed to add entry');
    }
  };

  const deletePaid = async () => {
    try {
      await axios.delete('http://localhost:5000/api/entries/paid', {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEntries();
    } catch (err) {
      console.error('❌ Error deleting paid entries:', err);
    }
  };

  return (
    <div className="dashboard-page">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Customer"
          value={form.customer}
          onChange={(e) => setForm({ ...form, customer: e.target.value })}
        />
        <input
          placeholder="Item"
          value={form.item}
          onChange={(e) => setForm({ ...form, item: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button type="submit">Add Entry</button>
      </form>

      <button onClick={deletePaid}>Delete Paid Entries</button>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id}>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
              <td>{entry.customer}</td>
              <td>{entry.item}</td>
              <td>{entry.quantity}</td>
              <td>₹{entry.price}</td>
              <td>₹{entry.quantity * entry.price}</td>
              <td>{entry.paid ? 'Paid' : 'Due'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;


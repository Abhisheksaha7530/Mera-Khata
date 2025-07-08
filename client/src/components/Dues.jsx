import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function Dues({ token }) {
  const [dues, setDues] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); // Optional loading state

  useEffect(() => {
    fetchDues();
  }, [token]);

  const fetchDues = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/entries/dues', {
        headers: { Authorization: token },
      });
      setDues(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch dues:', err);
      setLoading(false);
    }
  };

  const markAsPaid = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/entries/${id}/paid`, {}, {
        headers: { Authorization: token },
      });
      fetchDues();
    } catch (err) {
      console.error('Failed to mark as paid:', err);
    }
  };

  const deleteDue = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/entries/${id}`, {
        headers: { Authorization: token },
      });
      fetchDues();
    } catch (err) {
      console.error('Failed to delete due:', err);
    }
  };

  const filtered = dues.filter(d =>
    d.customer.toLowerCase().includes(search.toLowerCase())
  );
  const totalDue = filtered.reduce((sum, d) => sum + d.quantity * d.price, 0);

  return (
    <div className="dues-page">
      <h2>Unpaid Dues</h2>

      <input
        placeholder="Search customer"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h4>Total Due: ₹{totalDue}</h4>

      {loading ? (
        <p>Loading dues...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No dues found</td>
              </tr>
            ) : (
              filtered.map((entry) => (
                <tr key={entry._id}>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.customer}</td>
                  <td>{entry.item}</td>
                  <td>{entry.quantity}</td>
                  <td>₹{entry.price}</td>
                  <td>₹{entry.quantity * entry.price}</td>
                  <td>
                    <button onClick={() => markAsPaid(entry._id)}>Mark Paid</button>
                    <button
                      onClick={() => deleteDue(entry._id)}
                      style={{ marginLeft: '5px', backgroundColor: 'red', color: 'white' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dues;

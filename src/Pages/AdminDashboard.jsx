import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { FaCheck, FaTimes, FaTrash, FaEye, FaSignOutAlt } from 'react-icons/fa';

function AdminDashboard() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/quotes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch quotes');
      }
      const data = await response.json();
      setQuotes(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/quotes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quote status');
      }

      // Refresh quotes list
      fetchQuotes();
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteQuote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quote?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/admin/quotes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete quote');
      }

      // Refresh quotes list
      fetchQuotes();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Quote Management Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
      
      <div className="quotes-container">
        <div className="quotes-list">
          <h2>Recent Quotes</h2>
          <table>
            <thead>
              <tr>
                <th>Quote #</th>
                <th>Customer</th>
                <th>Vehicle</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote._id}>
                  <td>{quote.quoteNumber}</td>
                  <td>{quote.customerName}</td>
                  <td>{`${quote.vehicleYear} ${quote.vehicleMake} ${quote.vehicleModel}`}</td>
                  <td>R{quote.totalCost.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${quote.status}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="action-button view"
                      onClick={() => setSelectedQuote(quote)}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="action-button accept"
                      onClick={() => updateQuoteStatus(quote._id, 'accepted')}
                      title="Accept Quote"
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="action-button reject"
                      onClick={() => updateQuoteStatus(quote._id, 'rejected')}
                      title="Reject Quote"
                    >
                      <FaTimes />
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => deleteQuote(quote._id)}
                      title="Delete Quote"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedQuote && (
          <div className="quote-details">
            <h2>Quote Details</h2>
            <button className="close-button" onClick={() => setSelectedQuote(null)}>×</button>
            
            <div className="detail-section">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> {selectedQuote.customerName}</p>
              <p><strong>Email:</strong> {selectedQuote.email}</p>
              <p><strong>Phone:</strong> {selectedQuote.phone}</p>
            </div>

            <div className="detail-section">
              <h3>Vehicle Information</h3>
              <p><strong>Make:</strong> {selectedQuote.vehicleMake}</p>
              <p><strong>Model:</strong> {selectedQuote.vehicleModel}</p>
              <p><strong>Year:</strong> {selectedQuote.vehicleYear}</p>
            </div>

            <div className="detail-section">
              <h3>Service Details</h3>
              <p><strong>Paint Type:</strong> {selectedQuote.paintType}</p>
              <h4>Paint Areas:</h4>
              <ul>
                {selectedQuote.paintAreas.map((area, index) => (
                  <li key={index}>
                    {area.label} - R{area.price.toLocaleString()}
                  </li>
                ))}
              </ul>

              <h4>Additional Services:</h4>
              <ul>
                {selectedQuote.additionalServices.map((service, index) => (
                  <li key={index}>
                    {service.label} - R{service.price.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h3>Quote Summary</h3>
              <p><strong>Total Cost:</strong> R{selectedQuote.totalCost.toLocaleString()}</p>
              <p><strong>Estimated Time:</strong> {selectedQuote.estimatedTime} days</p>
              <p><strong>Status:</strong> {selectedQuote.status}</p>
              <p><strong>Created:</strong> {new Date(selectedQuote.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

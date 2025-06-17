// src/components/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import './AdminPanel.scss';

const AdminPanel = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [updates, setUpdates] = useState([
    { id: 1, text: '' },
    { id: 2, text: '' },
    { id: 3, text: '' }
  ]);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');

  // Check authorization on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessKey = urlParams.get('key');
    const envKey = import.meta.env.VITE_ADMIN_KEY;


    if (accessKey === envKey) {
      setIsAuthorized(true);
      
      // Load existing updates from localStorage
      const savedUpdates = localStorage.getItem('lifeUpdates');
      if (savedUpdates) {
        try {
          setUpdates(JSON.parse(savedUpdates));
        } catch (e) {
          console.error('Error parsing saved updates:', e);
        }
      }
    } else {
      setError('Invalid access key');
    }
  }, []);

  // Handle update changes
  const handleUpdateChange = (id, value) => {
    setUpdates(prev => 
      prev.map(update => 
        update.id === id ? { ...update, text: value } : update
      )
    );
    setIsSaved(false);
  };

  // Save updates to localStorage
  const saveUpdates = (e) => {
    e.preventDefault();
    
    // Validate if all updates have content
    if (updates.some(update => !update.text.trim())) {
      setError('All update fields must be filled');
      return;
    }
    
    try {
      localStorage.setItem('lifeUpdates', JSON.stringify(updates));
      setIsSaved(true);
      setError('');
    } catch (e) {
      setError('Failed to save updates: ' + e.message);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="admin-panel unauthorized">
        <h1>Administrator Panel</h1>
        <p className="error">{error || 'Unauthorized access'}</p>
        <p>You need proper authorization to access this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h1>Life Updates Admin</h1>
      <p className="instruction">Update your life updates below. They'll be displayed on your portfolio homepage.</p>
      
      <form onSubmit={saveUpdates}>
        {updates.map((update, index) => (
          <div key={update.id} className="update-input">
            <label htmlFor={`update-${update.id}`}>Update {index + 1}:</label>
            <input
              id={`update-${update.id}`}
              value={update.text}
              onChange={(e) => handleUpdateChange(update.id, e.target.value)}
              placeholder="Enter update text (HTML tags like <strong> are supported)"
              rows={3}
            />
          </div>
        ))}
        
        {error && <p className="error">{error}</p>}
        {isSaved && <p className="success">Updates saved successfully!</p>}
        
        <div className="actions">
          <button type="submit" className="save-button">Save Updates</button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;
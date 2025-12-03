import React, { useState } from 'react';
import './App.css';

function EventForm({ events, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form-content">
      <div className="form-group">
        <label htmlFor="fullName">Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Enter your phone number"
        />
      </div>

      <div className="form-group">
        <label htmlFor="eventId">Select Event *</label>
        <select
          id="eventId"
          name="eventId"
          value={formData.eventId}
          onChange={handleChange}
          required
        >
          <option value="">Choose an event...</option>
          {events.map(event => (
            <option key={event.id} value={event.id}>
              {event.title} ({event.date})
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="submit-btn" disabled={loading}>
        {loading ? 'Processing...' : 'Register & Generate Ticket'}
      </button>
    </form>
  );
}

export default EventForm;
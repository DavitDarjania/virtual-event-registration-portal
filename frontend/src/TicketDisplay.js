import React from 'react';
import './App.css';

function TicketDisplay({ ticket }) {
  return (
    <div className="ticket">
      <div className="ticket-header">
        <h2>🎫 Your  Ticket</h2>
        <div className="ticket-number">{ticket.ticketNumber}</div>
      </div>
      
      <div className="ticket-body">
        <div className="ticket-section">
          <h3>Attendee Information</h3>
          <div className="ticket-info">
            <p><strong>Name:</strong> {ticket.fullName}</p>
            <p><strong>Email:</strong> {ticket.email}</p>
            <p><strong>Phone:</strong> {ticket.phone}</p>
          </div>
        </div>

        <div className="ticket-section">
          <h3>Event Details</h3>
          <div className="ticket-info">
            <p><strong>Event:</strong> {ticket.eventTitle}</p>
            <p><strong>Date:</strong> {ticket.eventDate}</p>
            <p><strong>Time:</strong> {ticket.eventTime}</p>
            <p><strong>Location:</strong> {ticket.eventLocation}</p>
          </div>
        </div>

        <div className="ticket-section">
          <h3>Registration Details</h3>
          <div className="ticket-info">
            <p><strong>Registration Date:</strong> {ticket.registrationDate}</p>
            <p><strong>Ticket ID:</strong> {ticket.id}</p>
          </div>
        </div>

        <div className="ticket-qr">
          <div className="qr-placeholder">
            <div className="qr-code"></div>
            <b>Scan QR code at entrance</b>
          </div>
        </div>

        <div className="ticket-footer">
          <p> Present this ticket at the event entrance</p>
          <p> A confirmation email has been sent to <b>{ticket.email}</b></p>
        </div>
      </div>
    </div>
  );
}

export default TicketDisplay;
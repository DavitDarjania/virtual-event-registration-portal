import React, { useState, useEffect } from "react";
import EventForm from "./EventForm";
import TicketDisplay from "./TicketDisplay";
import axios from "axios";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleRegistration = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/register", formData);
      setTicket(response.data);
      alert("Registration successful! Your ticket has been generated.");
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNewRegistration = () => {
    setTicket(null);
  };

  return (
    <div className="App">
      <header className="header">
        <h2>Register for events and get your digital tickets instantly!</h2>
      </header>

      <div className="container">
        {ticket ? (
          <div className="ticket-section">
            <button
              onClick={handleNewRegistration}
              className="new-registration-btn"
            >
              Register for Another Event
            </button>
            <TicketDisplay ticket={ticket} />
          </div>
        ) : (
          <div className="registration-section">
            <div className="events-list">
              <h2> Available Events</h2>
              {events.map((event) => (
                <div key={event.id} className="event-card">
                  <h3>{event.title}</h3>
                  <p>
                    <strong>Date:</strong> {event.date} at {event.time}
                  </p>
                  <p>
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Description:</strong> {event.description}
                  </p>
                  <p>
                    <strong>Capacity:</strong> {event.capacity} attendees
                  </p>
                </div>
              ))}
            </div>

            <div className="registration-form">
              <h2> Event Registration</h2>
              <EventForm
                events={events}
                onSubmit={handleRegistration}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>Virtual Event Registration Portal (MVP)</p>
      </footer>
    </div>
  );
}

export default App;

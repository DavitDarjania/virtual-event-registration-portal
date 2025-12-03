import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <header className="header">
        <h2>Register for events and get your digital tickets instantly!</h2>
      </header>

      <footer className="footer">
        <p>Virtual Event Registration Portal (MVP)</p>
      </footer>
    </div>
  );
}

export default App;

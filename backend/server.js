const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const EVENTS_FILE = path.join(__dirname, "events.json");

// Initial events data
const initialEvents = [
  {
    id: "1",
    title: "Tech Conference 2024",
    date: "2024-12-15",
    time: "09:00",
    location: "Convention Center",
    description: "Annual technology conference with industry leaders",
    capacity: 500,
  },
  {
    id: "2",
    title: "Music Festival",
    date: "2024-11-20",
    time: "18:00",
    location: "Central Park",
    description: "Open air music festival",
    capacity: 1000,
  },
  {
    id: "3",
    title: "Startup Workshop",
    date: "2024-10-30",
    time: "14:00",
    location: "Business Hub",
    description: "Learn how to launch your startup",
    capacity: 100,
  },
];

// Initialize events file
async function initializeEvents() {
  try {
    await fs.access(EVENTS_FILE);
  } catch {
    await fs.writeFile(
      EVENTS_FILE,
      JSON.stringify({ events: initialEvents, registrations: [] }, null, 2)
    );
  }
}

// GET all events
app.get("/api/events", async (req, res) => {
  try {
    const data = await fs.readFile(EVENTS_FILE, "utf8");
    const jsonData = JSON.parse(data);
    res.json(jsonData.events);
  } catch (error) {
    console.error("Error reading events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// POST new registration
app.post("/api/register", async (req, res) => {
  try {
    const registrationData = req.body;

    // Validate required fields
    const requiredFields = ["fullName", "email", "phone", "eventId"];
    for (const field of requiredFields) {
      if (!registrationData[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const data = await fs.readFile(EVENTS_FILE, "utf8");
    const jsonData = JSON.parse(data);

    // Check if event exists
    const event = jsonData.events.find(
      (e) => e.id === registrationData.eventId
    );
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Generate ticket
    const ticket = {
      id: uuidv4(),
      ...registrationData,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      registrationDate: new Date().toISOString().split("T")[0],
      ticketNumber: `TICKET-${Date.now()}`,
    };

    // Save registration
    jsonData.registrations.push(ticket);
    await fs.writeFile(EVENTS_FILE, JSON.stringify(jsonData, null, 2));

    res.status(201).json(ticket);
  } catch (error) {
    console.error("Error saving registration:", error);
    res.status(500).json({ error: "Failed to register for event" });
  }
});

// GET registration by ticket ID
app.get("/api/ticket/:id", async (req, res) => {
  try {
    const data = await fs.readFile(EVENTS_FILE, "utf8");
    const jsonData = JSON.parse(data);

    const ticket = jsonData.registrations.find((r) => r.id === req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
});

app.listen(PORT, async () => {
  await initializeEvents();
  console.log(`Server running on http://localhost:${PORT}`);
});

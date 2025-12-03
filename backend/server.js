const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
  await initializeEvents();
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require("express");
const app = express();

// URL parser
app.use(express.json());

// Define API endpoints
app.get("/api/:date?", (req, res) => {
  try {
    const request = req.params.date;

    if (!request) {
      // If no date is passed, return the current time
      const now = new Date();
      return res.json({ unix: now.getTime(), utc: now.toUTCString() });
    }

    // Check if the request is a valid number (Unix timestamp)
    const date = isNaN(request) ? new Date(request) : new Date(Number(request));

    // Handle invalid date
    if (date.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }

    // Return the Unix and UTC format of the date
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  } catch (error) {
    console.log("There is an error", error.message);
    return res.json({ error: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}.....`);
});
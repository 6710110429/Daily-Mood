const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({
    service: "daily-mood-health",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Health service running on port", PORT);
});

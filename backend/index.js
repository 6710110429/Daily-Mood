const express = require("express");
const app = express();

console.log("🔥 REAL BACKEND INDEX.JS LOADED");

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/user/:id", (req, res) => {
  console.log("✅ USER ROUTE HIT", req.params.id);
  res.json({
    userId: req.params.id,
    status: "working"
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});

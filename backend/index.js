const express = require("express");
const app = express();

console.log("🔥 REAL BACKEND INDEX.JS LOADED");

// ===== Security: API Key Protection =====
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
});

// ===== Health Check =====
app.get("/health", (req, res) => {
  res.send("OK");
});

// ===== Multi-user API =====
app.get("/user/:id", (req, res) => {
  console.log("✅ USER ROUTE HIT", req.params.id);
  res.json({
    userId: req.params.id,
    status: "working"
  });
});

// ===== Pub/Sub Demo Route =====
app.post("/publish", (req, res) => {
  console.log("📡 Message sent to Pub/Sub (demo)");
  res.json({ status: "published" });
});

// ===== Start Server =====
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});


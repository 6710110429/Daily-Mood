const express = require("express");
const admin = require("firebase-admin");

const app = express();
app.use(express.json()); // ⭐ สำคัญมาก

console.log("🔥 REAL BACKEND INDEX.JS LOADED");

// ===== Firebase / Firestore =====
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const db = admin.firestore();

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

// ===== Create / Update User (Multi-user + DB) =====
app.post("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, mood } = req.body;

  await db.collection("users").doc(userId).set({
    name,
    mood,
    updatedAt: new Date(),
  });

  res.json({
    userId,
    status: "saved",
  });
});

// ===== Get User =====
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  const doc = await db.collection("users").doc(userId).get();
  if (!doc.exists) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    userId,
    ...doc.data(),
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


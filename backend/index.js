const express = require("express");
const admin = require("firebase-admin");
const { PubSub } = require("@google-cloud/pubsub");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json()); // ⭐ สำคัญมาก

console.log("🔥 REAL BACKEND INDEX.JS LOADED");

// ===============================
// Firebase / Firestore
// ===============================
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = admin.firestore();

// ===============================
// Pub/Sub
// ===============================
const pubsub = new PubSub();
const TOPIC_NAME = "mood-topic";

async function publishMoodEvent(data) {
  const buffer = Buffer.from(JSON.stringify(data));
  await pubsub.topic(TOPIC_NAME).publish(buffer);
  console.log("📤 Published to Pub/Sub:", data);
}

// ===============================
// Security: API Key Protection
// ===============================
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
});

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 นาที
  max: 100,               // ไม่เกิน 100 request ต่อ IP
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// ===============================
// Health Check (Cloud Run)
// ==============================
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "daily-mood-backend",
    timestamp: new Date().toISOString()
  });
});

// ===============================
// Create / Update User (Multi-user)
// ===============================
app.post("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, mood } = req.body;

    const payload = {
      userId,
      name,
      mood,
      updatedAt: new Date().toISOString(),
    };

    // 1️⃣ Save to Firestore (ข้อมูลหลัก)
    await db.collection("users").doc(userId).set(payload);

    // 2️⃣ Publish event to Pub/Sub (async / concurrency)
    await publishMoodEvent({
      type: "USER_MOOD_UPDATED",
      ...payload,
    });

    res.json({
      status: "saved",
      userId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ===============================
// Get User Data
// ===============================
app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const doc = await db.collection("users").doc(userId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      userId,
      ...doc.data(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ===============================
// Pub/Sub Test Endpoint
// ===============================
app.post("/publish", async (req, res) => {
  await publishMoodEvent({
    type: "TEST_EVENT",
    time: new Date().toISOString(),
  });

  res.json({ status: "published to pubsub" });
});

// ===============================
// Start Server (Cloud Run)
// ===============================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});


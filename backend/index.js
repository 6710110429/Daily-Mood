const cors = require("cors");
app.use(cors());

const fs = require("fs");

const { PubSub } = require("@google-cloud/pubsub");

const pubsub = new PubSub();
const topicName = "test-topic";

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// API สำหรับรับข้อมูลอารมณ์ (รองรับหลายคน)
app.post("/mood", (req, res) => {
  const { userId, mood } = req.body;

  res.json({
    message: "Mood saved",
    userId: userId,
    mood: mood,
    time: new Date()
  });
});

// API ทดสอบว่า server ยังทำงาน
app.get("/health", (req, res) => {
  res.send("Backend API is running");
});
// API สำหรับทดสอบการส่งข้อความไปยัง Pub/Sub
app.post("/publish", async (req, res) => {
  const message = {
    text: "Hello from Backend",
    time: new Date().toISOString()
  };

  try {
    const dataBuffer = Buffer.from(JSON.stringify(message));
    await pubsub.topic(topicName).publishMessage({ data: dataBuffer });

    res.send("Message published to Pub/Sub");
  } catch (error) {
    console.error(error);
    res.status(500).send("Publish failed");
  }
});

app.post("/backup", (req, res) => {
  const data = {
    message: "Backup data",
    time: new Date().toISOString()
  };

  fs.writeFileSync(
    `backups/backup-${Date.now()}.json`,
    JSON.stringify(data, null, 2)
  );

  res.send("Backup completed");
});

const API_KEY = process.env.API_KEY || "123456";

app.use((req, res, next) => {
  const key = req.headers["x-api-key"];
  if (key !== API_KEY) {
    return res.status(403).send("Forbidden");
  }
  next();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

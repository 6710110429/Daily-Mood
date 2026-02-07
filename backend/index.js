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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

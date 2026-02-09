const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// 🎯 Cloud Function: รับ event จาก Pub/Sub
exports.handleMoodEvent = async (event, context) => {
  const message = event.data
    ? JSON.parse(Buffer.from(event.data, "base64").toString())
    : {};

  console.log("📥 Mood event received:", message);

  if (!message.userId || !message.mood) {
    console.log("❌ Missing data");
    return;
  }

  // ตัวอย่าง: log ลง collection logs
  await db.collection("logs").add({
    userId: message.userId,
    mood: message.mood,
    createdAt: new Date(),
    source: "pubsub",
  });

  console.log("✅ Mood logged to Firestore");
};


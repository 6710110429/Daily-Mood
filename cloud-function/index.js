const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.logMood = async (req, res) => {
  const body = req.body || {};
  const { userId, mood } = body;

  // กรณี Cloud Scheduler (ไม่มี body)
  if (!userId || !mood) {
    await db.collection("system_logs").add({
      type: "scheduler",
      message: "Daily cron executed",
      createdAt: new Date(),
    });

    return res.json({
      status: "scheduler-ok",
    });
  }

  // กรณี user ใช้งานจริง
  await db.collection("logs").add({
    userId,
    mood,
    createdAt: new Date(),
  });

  res.json({ status: "logged" });
};


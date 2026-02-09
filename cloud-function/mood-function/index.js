const functions = require("@google-cloud/functions-framework");

functions.cloudEvent("handleMoodEvent", (cloudEvent) => {
  const message = cloudEvent.data.message.data
    ? Buffer.from(cloudEvent.data.message.data, "base64").toString()
    : null;

  console.log("📩 Mood event received:", message);
});

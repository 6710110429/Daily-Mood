import { PubSub } from "@google-cloud/pubsub";

const pubsub = new PubSub();
const topicName = "mood-topic";

export async function publishMood(data) {
  const messageBuffer = Buffer.from(JSON.stringify(data));
  await pubsub.topic(topicName).publish(messageBuffer);
}

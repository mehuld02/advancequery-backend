import Query from "../models/Query.js";
import { autoTag } from "./autoTag.js";
import { autoPriority } from "./autoPriority.js";

const whatsappSenders = [
  "Raj (WhatsApp)",
  "Priya (WhatsApp)",
  "Customer 90908",
  "Client WA-User",
];

const instagramSenders = ["insta_user_12", "fashion_queen", "brand_lover_007"];

const emailSenders = [
  "john@example.com",
  "mehul@gmail.com",
  "support@client.com",
];

const sampleMessages = [
  "My order is delayed, please help.",
  "I want to return my product.",
  "Payment failed during checkout.",
  "App is crashing again.",
  "When will my refund be processed?",
  "Need help with my account login.",
  "Your service is amazing, thank you!",
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function generateDummyMessage() {
  const platforms = ["whatsapp", "instagram", "email"];
  const platform = getRandom(platforms);

  let customerName = "";
  if (platform === "whatsapp") customerName = getRandom(whatsappSenders);
  if (platform === "instagram") customerName = getRandom(instagramSenders);
  if (platform === "email") customerName = getRandom(emailSenders);

  const message = getRandom(sampleMessages);
  const category = autoTag(message);
  const priority = autoPriority(message);

  await Query.create({
    customerName,
    message,
    category,
    priority,
    source: platform,
  });

  console.log(`📩 Dummy ${platform.toUpperCase()} message generated.`);
}

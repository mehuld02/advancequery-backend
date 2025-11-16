import express from "express";
import {
  whatsappWebhook,
  metaWebhook,
  twitterWebhook,
  emailWebhook,
  chatWebhook,
} from "../webhooks/integrationsHandlers.js";

const router = express.Router();

router.post("/whatsapp", whatsappWebhook);
router.post("/meta", metaWebhook);
router.post("/twitter", twitterWebhook);
router.post("/email", emailWebhook);
router.post("/chat", chatWebhook);

export default router;

// src/index.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import queryRoutes from "./routes/queryRoutes.js";
import cron from "node-cron";
import { autoEscalateQueries } from "./utils/escalationEngine.js";
import integrationsRoutes from "./routes/integrationsRoutes.js";
import { generateDummyMessage } from "./utils/dummyMessageGenerator.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/queries", queryRoutes);
app.use("/api/integrations", integrationsRoutes);

cron.schedule("*/30 * * * * *", async () => {
  console.log("➡ Generating dummy message...");
  await generateDummyMessage();
});

app.get("/", (req, res) => res.send("Audience Query Manager Backend"));

app.use("/api/queries", queryRoutes);

cron.schedule("*/5 * * * *", () => {
  console.log("⏳ Running Auto-Escalation Check...");
  autoEscalateQueries();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

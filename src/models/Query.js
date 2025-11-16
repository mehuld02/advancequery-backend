import mongoose from "mongoose";

// REPLY SUB-SCHEMA
const replySchema = new mongoose.Schema({
  message: { type: String, required: true },
  repliedBy: { type: String, default: "agent" },
  createdAt: { type: Date, default: Date.now },
  replies: [
    {
      message: String,
      repliedBy: { type: String, default: "agent" },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

// MAIN QUERY SCHEMA
const querySchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    message: { type: String, required: true },

    category: { type: String, default: "General" },
    priority: { type: String, default: "Low" },
    status: { type: String, default: "Open" },

    assignedTo: { type: String, default: "Unassigned" },

    platform: { type: String, default: "web" },
    platformId: { type: String, default: "" },

    escalated: { type: Boolean, default: false },
    escalationLevel: { type: Number, default: 0 },
    
    lastEscalation: { type: Date, default: null },
    source: { type: String, default: "web" }, 

    replies: [
      {
        message: String,
        repliedBy: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    history: [
      {
        action: String,
        by: String,
        payload: Object,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Query", querySchema);

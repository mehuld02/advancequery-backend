import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    message: { type: String, required: true },

    category: { type: String, default: "General" },
    priority: { type: String, default: "Low" },
    status: { type: String, default: "Open" },

    assignedTo: { type: String, default: "Unassigned" },

    escalated: { type: Boolean, default: false },
    escalationLevel: { type: Number, default: 0 }, 
    lastEscalation: { type: Date, default: null },
  },
  { timestamps: true }
);

const Query = mongoose.models.Query || mongoose.model("Query", querySchema);

export default Query;

import Query from "../models/queryModel.js";

export const autoEscalateQueries = async () => {
  try {
    const queries = await Query.find({ status: "Open" });

    const now = new Date();

    for (let q of queries) {
      const createdAt = new Date(q.createdAt);
      const hoursPassed = (now - createdAt) / (1000 * 60 * 60);

      if (hoursPassed >= 24 && q.escalationLevel < 1) {
        q.escalationLevel = 1;
        q.priority = "High";
        q.escalated = true;
        q.assignedTo = "Team Lead";
        q.lastEscalation = now;

        await q.save();
        console.log(`🚨 Auto-Escalated to Level 1 → ${q._id}`);
      }

      if (hoursPassed >= 48 && q.escalationLevel < 2) {
        q.escalationLevel = 2;
        q.priority = "High";
        q.escalated = true;
        q.assignedTo = "Manager";
        q.lastEscalation = now;

        await q.save();
        console.log(`🔥 AUTO-ESCALATED to Level 2 → ${q._id}`);
      }
    }
  } catch (err) {
    console.log("Escalation Engine Error:", err);
  }
};

import Query from "../models/Query.js";;

export async function addReply(req, res) {
  try {
    const queryId = req.params.id;
    const { message, repliedBy } = req.body;

    if (!message)
      return res
        .status(400)
        .json({ success: false, error: "Reply message required" });

    const q = await Query.findById(queryId);
    if (!q)
      return res.status(404).json({ success: false, error: "Query not found" });

    q.replies.push({
      message,
      repliedBy: repliedBy || "agent",
    });

    if (!q.firstResponseAt) {
      q.firstResponseAt = new Date();
      q.status = "In Progress"; 
    }

    q.history.push({
      action: "replied",
      by: repliedBy || "agent",
      payload: { message },
    });

    await q.save();
    if (q.platform === "whatsapp") {
      await sendWhatsAppMessage(q.platformId, message);
    }
    if (q.platform === "instagram" || q.platform === "facebook") {
      await sendMetaMessage(q.platformId, message);
    }
    if (q.platform === "twitter") {
      await sendTwitterMessage(q.platformId, message);
    }
    if (q.platform === "email") {
      await sendEmail(q.platformId, message);
    }

    return res.status(200).json({
      success: true,
      message: "Reply added",
      data: q,
    });
  } catch (err) {
    console.error("addReply Error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
}

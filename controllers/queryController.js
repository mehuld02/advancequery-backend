import Query from "../models/Query.js";
import { autoTag } from "../utils/autoTag.js";
import { autoPriority } from "../utils/autoPriority.js";

export async function addQuery(req, res) {
  try {
    const { customerName, message } = req.body;

    const category = autoTag(message);
    const priority = autoPriority(message);

    const newQuery = await Query.create({
      customerName,
      message,
      category,
      priority,
    });

    res.json({ success: true, data: newQuery });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
}

export async function getAllQueries(req, res) {
  try {
    const q = await Query.find().sort({ createdAt: -1 });
    res.json(q);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

export async function updateQuery(req, res) {
  try {
    const updated = await Query.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

export async function analytics(req, res) {
  try {
    const total = await Query.countDocuments();
    const open = await Query.countDocuments({ status: "Open" });
    const inProgress = await Query.countDocuments({ status: "In Progress" });
    const resolved = await Query.countDocuments({ status: "Resolved" });

    const high = await Query.countDocuments({ priority: "High" });
    const medium = await Query.countDocuments({ priority: "Medium" });
    const low = await Query.countDocuments({ priority: "Low" });

    res.json({
      total,
      status: { open, inProgress, resolved },
      priority: { high, medium, low },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

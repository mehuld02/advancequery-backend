import express from "express";
import { addReply } from "../controllers/responseController.js";
import {
  addQuery,
  getAllQueries,
  updateQuery,
  analytics,
} from "../controllers/queryController.js";
import Query from "../models/queryModel.js";

const router = express.Router();

router.post("/add", addQuery);

router.get("/all", getAllQueries);

router.get("/:id", async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);

    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    res.json({
      success: true,
      query,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/:id/reply", addReply);

router.patch("/:id", updateQuery);

router.get("/analytics", analytics);

export default router;

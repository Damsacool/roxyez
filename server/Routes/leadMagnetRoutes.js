const express = require("express");
const router = express.Router();
const {
  getActiveLeadMagnet,
  createLeadMagnet,
  updateLeadMagnet,
  subscribe,
  getAllSubscribers,
} = require("../Controller/leadMagnetController");
const protect = require("../Middleware/authMiddleware");

router.get("/", getActiveLeadMagnet);
router.post("/", protect, createLeadMagnet);
router.put("/:id", protect, updateLeadMagnet);
router.post("/subscribe", subscribe);
router.get("/subscribers", protect, getAllSubscribers);

module.exports = router;
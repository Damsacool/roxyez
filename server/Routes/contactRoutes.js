const express = require("express");
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  markAsRead,
} = require("../Controller/contactController");
const protect = require("../Middleware/authMiddleware");

router.post("/", submitContact);
router.get("/", protect, getAllContacts);
router.put("/:id/read", protect, markAsRead);

module.exports = router;
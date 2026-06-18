const express = require("express");
const router = express.Router();
const { submitContact, getAllContacts, markAsRead, } = require("../Controller/contactController");
const protect = require("../Middleware/authMiddleware");
const Contact = require("../Model/Contact")

router.post("/", submitContact);
router.get("/", protect, getAllContacts);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ message: "Deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router;


const Contact = require("../Model/Contact");

// POST /api/contact — public, visitor submits the form
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const submission = await Contact.create({ name, email, phone, message });
    res.status(201).json({ message: "Message received! We'll be in touch soon." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/contact — admin only, view all submissions
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/contact/:id/read — admin only, mark message as read
const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Marked as read", contact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { submitContact, getAllContacts, markAsRead };
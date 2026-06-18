const Contact = require("../Model/Contact");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const submission = await Contact.create({ name, email, phone, message });

    try {
      await resend.emails.send({
        from: "RoxyEZ Website <onboarding@resend.dev>",
        to: process.env.NOTIFY_EMAIL,
        subject: `New message from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });
    } catch (emailError) {
      console.log("Email notification failed:", emailError.message);
    }

    res.status(201).json({ message: "Message received! We'll be in touch soon." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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
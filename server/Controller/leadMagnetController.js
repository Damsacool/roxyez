const LeadMagnet = require("../Model/LeadMagnet");
const Subscriber = require("../Model/Subscriber");
const Resend = require("resend").Resend
const resend = new Resend(process.env.RESEND_API_KEY)

const getActiveLeadMagnet = async (req, res) => {
  try {
    const magnet = await LeadMagnet.findOne({ isActive: true });
    res.status(200).json(magnet);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createLeadMagnet = async (req, res) => {
  try {
    // deactivate any existing active lead magnet first
    await LeadMagnet.updateMany({}, { isActive: false });
    const magnet = await LeadMagnet.create({ ...req.body, isActive: true });
    res.status(201).json({ message: "Lead magnet created", magnet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateLeadMagnet = async (req, res) => {
  try {
    const magnet = await LeadMagnet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!magnet) return res.status(404).json({ message: "Lead magnet not found" });
    res.status(200).json({ message: "Lead magnet updated", magnet });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const subscribe = async (req, res) => {
  try {
    const { email, leadMagnetTitle } = req.body
    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    const existing = await Subscriber.findOne({ email })
    if (existing) {
      const magnet = await LeadMagnet.findOne({ isActive: true })
      return res.status(200).json({ fileUrl: magnet?.fileUrl })
    }

    await Subscriber.create({ email, leadMagnetTitle })
    const magnet = await LeadMagnet.findOne({ isActive: true })

    try {
      await resend.emails.send({
        from: "RoxyEZ Website <onboarding@resend.dev>",
        to: process.env.NOTIFY_EMAIL,
        subject: `New lead magnet signup: ${email}`,
        html: `
          <h2>New Subscriber</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Downloaded:</strong> ${leadMagnetTitle || "Lead magnet"}</p>
        `,
      })
    } catch (emailError) {
      console.log("Subscriber email notification failed:", emailError.message)
    }

    res.status(201).json({ message: "Subscribed", fileUrl: magnet?.fileUrl })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getActiveLeadMagnet,
  createLeadMagnet,
  updateLeadMagnet,
  subscribe,
  getAllSubscribers
};
const mongoose = require("mongoose");

const leadMagnetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    fileUrl: {
      type: String, 
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeadMagnet", leadMagnetSchema);

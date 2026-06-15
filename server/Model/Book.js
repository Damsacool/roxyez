const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String, 
    },
    kindlePrice: {
      type: String, 
    },
    paperbackPrice: {
      type: String, 
    },
    amazonLink: {
      type: String, 
    },
    status: {
      type: String,
      enum: ["live", "coming_soon"],
      default: "coming_soon",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
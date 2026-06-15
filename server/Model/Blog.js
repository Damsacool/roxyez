const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true, 
    },
    excerpt: {
      type: String, 
    },
    coverImage: {
      type: String, 
    },
    category: {
      type: String,
      enum: ["Education", "Entrepreneurship", "Finance", "Faith", "General"],
      default: "General",
    },
    isPublished: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
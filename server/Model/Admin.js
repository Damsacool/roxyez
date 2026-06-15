const mongoose = require("mongoose");

// This is Roxanna's admin account
// There is only one admin that exist, only her
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Admin", adminSchema);
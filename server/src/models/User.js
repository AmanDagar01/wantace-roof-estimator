const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password_hash: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["OWNER"],
      default: "OWNER",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
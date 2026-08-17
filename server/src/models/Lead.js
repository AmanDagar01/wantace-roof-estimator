const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    legacy_id: {
      type: String,
      unique: true,
      sparse: true,
    },

    captured_at: {
      type: Date,
      default: Date.now,
    },

    config_version: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    answers: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },

    estimate_low: {
      type: Number,
      required: true,
      min: 0,
    },

    estimate_high: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

leadSchema.index({
  captured_at: -1,
});

leadSchema.index({
  config_version: 1,
});

module.exports = mongoose.model("Lead", leadSchema);
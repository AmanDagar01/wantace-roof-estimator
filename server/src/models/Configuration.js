const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      trim: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    rate_per_sqft: {
      type: Number,
      min: 0,
    },

    multiplier: {
      type: Number,
      min: 0,
    },

    tear_off_per_sqft: {
      type: Number,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

const questionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["number", "select", "text", "boolean"],
    },

    unit: {
      type: String,
      default: null,
    },

    required: {
      type: Boolean,
      default: false,
    },

    min: {
      type: Number,
    },

    max: {
      type: Number,
    },

    active: {
      type: Boolean,
      default: true,
    },

    options: {
      type: [optionSchema],
      default: [],
    },

    display_order: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const configurationSchema = new mongoose.Schema(
  {
    version: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
    },

    business: {
      name: {
        type: String,
        required: true,
      },

      region: {
        type: String,
        required: true,
      },

      currency: {
        type: String,
        required: true,
        default: "USD",
      },
    },

    questions: {
      type: [questionSchema],
      required: true,
      default: [],
    },

    modifiers: {
      waste_factor: {
        type: Number,
        required: true,
        min: 0,
      },

      permit_flat_fee: {
        type: Number,
        required: true,
        min: 0,
      },

      range_spread_pct: {
        type: Number,
        required: true,
        min: 0,
      },
    },

    is_active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

configurationSchema.index({
  is_active: 1,
});

module.exports = mongoose.model(
  "Configuration",
  configurationSchema
);
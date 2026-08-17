const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
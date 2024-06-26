const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requird: true,
    },
    email: {
      type: String,
      requird: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      requird: true,
    },
    quizCreated: {
      type: Number,
      default: 0,
    },
    questionsCreated: {
      type: Number,
      default: 0,
    },
    totalImpressions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    refUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quizName: {
      type: String,
    },
    slides: [
      {
        question: {
          type: String,
          required: true,
        },
        options: [
          {
            text: {
              type: String,
            },
            image: {
              type: String,
              default: "",
            },
          },
        ],
        optionType: {
          type: String,
          enum: ["text", "image", "textImage"],
          default: "text",
        },
        timer: {
          type: String,
          enum: ["5 sec", "10 sec", "OFF"],
          default: "OFF",
        },
        correctAnswer: {
          type: Number,
        },
        attempts: {
          type: Number,
          default: 0,
        },
        correct: {
          type: Number,
          default: 0,
        },
        incorrect: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalImpressions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);

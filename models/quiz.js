const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);

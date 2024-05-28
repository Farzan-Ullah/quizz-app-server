const Quiz = require("../models/quiz");
const User = require("../models/user");

const createQuiz = async (req, res) => {
  try {
    const userId = req.userId;
    const { slides } = req.body;

    const numberOfQuestions = slides.length;

    const quiz = new Quiz({
      userId,
      slides,
    });

    await quiz.save();

    await User.findByIdAndUpdate(userId, {
      $inc: { quizCreated: 1, questionsCreated: numberOfQuestions },
    });

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Could not create quiz" });
  }
};

const getQuizByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const quizzes = await Quiz.find({ userId });

    res.json(quizzes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Could not fetch quizzes" });
  }
};

const getQuizById = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ errorMessage: "Quiz not found" });
    }

    res.json({ quiz });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ errorMessage: "Failed to fetch quiz" });
  }
};

module.exports = { createQuiz, getQuizByUser, getQuizById };

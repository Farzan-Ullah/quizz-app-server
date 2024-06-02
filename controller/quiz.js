const Quiz = require("../models/quiz");
const User = require("../models/user");

const createQuiz = async (req, res) => {
  try {
    const userId = req.userId;
    const { slides, quizName } = req.body;

    const numberOfQuestions = slides.length;

    const quiz = new Quiz({
      userId,
      quizName,
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

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({});
    res.json({ quizzes });
  } catch (error) {
    console.error("Error fetching all quizzes:", error);
    res.status(500).json({ errorMessage: "Failed to fetch quizzes" });
  }
};

const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;

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

const deleteQuizById = async (req, res) => {
  const { quizId } = req.params;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ errorMessage: "Quiz not found" });
    }

    await Quiz.findByIdAndDelete(quizId);

    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ errorMessage: "Failed to delete quiz" });
  }
};

const editQuizById = async (req, res) => {
  const { quizId } = req.params;
  const { slides } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ errorMessage: "Quiz not found" });
    }

    await Quiz.findByIdAndUpdate(quizId, { slides });

    res.json({ message: "Quiz updated successfully" });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ errorMessage: "Failed to update quiz" });
  }
};

const updateImpressions = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { $inc: { totalImpressions: 1 } },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ errorMessage: "Quiz not found" });
    }

    res.json({
      message: "Impressions updated",
      totalImpressions: quiz.totalImpressions,
    });
  } catch (error) {
    console.error("Error updating impressions:", error);
    res.status(500).json({ errorMessage: "Failed to update impressions" });
  }
};

module.exports = {
  createQuiz,
  getQuizByUser,
  getQuizById,
  deleteQuizById,
  editQuizById,
  updateImpressions,
  getAllQuizzes,
};

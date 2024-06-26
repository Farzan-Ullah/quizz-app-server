// routes/quiz.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const quizController = require("../controller/quiz");

router.post("/create", verifyToken, quizController.createQuiz);
router.get("/all", quizController.getAllQuizzes);
router.get("/quizz", quizController.getQuizByUser);
router.get("/quizz/:quizId", quizController.getQuizById);
router.delete("/delete-quiz/:quizId", quizController.deleteQuizById);
router.put("/update/:quizId", quizController.editQuizById);
router.put("/update-impressions/:quizId", quizController.updateImpressions);
router.post("/updateQuizStatistics", quizController.updateQuizStatistics);

module.exports = router;

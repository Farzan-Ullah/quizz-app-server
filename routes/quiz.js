// routes/quiz.js
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const quizController = require("../controller/quiz");

router.use(verifyToken);

router.post("/create", quizController.createQuiz);
router.get("/quizz", quizController.getQuizByUser);
router.get("/quizz/:quizId", quizController.getQuizById);

module.exports = router;

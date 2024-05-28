const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verifyToken");
const userAuthController = require("../controller/user");

router.post("/register", userAuthController.registerUser);
router.post("/login", userAuthController.loginUser);
router.get("/stats/:userId", verifyToken, userAuthController.getUserStats);

module.exports = router;

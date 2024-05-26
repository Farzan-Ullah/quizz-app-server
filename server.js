require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const userRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Database"))
  .catch((error) => console.log("Database Connection Failed", error));

app.get("/check", (req, res) => {
  res.json("Hello World!");
});

app.use("/api/userauth", userRoutes);
app.use("/api/quiz", quizRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

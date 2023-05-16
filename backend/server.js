const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send({ message: "I am home route" });
});

app.use("/api/user", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/chat", require("./routes/chatRoute"));

app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`);
});

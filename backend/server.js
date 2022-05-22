const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");

const { errorHandler } = require("./middleware/errorMiddleware");
const { connectDB } = require("./config/db");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 4000;

//Connect to database
connectDB();

const version = "v1";

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Support System API" });
});
// User Routes
app.use(`/api/${version}/users`, require("./routes/userRoutes"));
app.use(`/api/${version}/tickets`, require("./routes/ticketRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log("Server running on port " + PORT));

console.log("Server started..");

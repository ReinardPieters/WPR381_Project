// app.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const pageRoutes = require("./routes/pageRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;
//Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", pageRoutes);

app.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
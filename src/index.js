const express = require("express");
require("./config/db/db");
require("dotenv").config();
const cors = require("cors");

const instructorRoutes = require("./routes/instructorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const otpRoutes = require("./routes/otpRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  cors({
    exposedHeaders: ["Authorization"],
  }),
);

app.use("/api", instructorRoutes);
app.use("/api", studentRoutes);
app.use("/api", otpRoutes);
app.use("/api", courseRoutes);

module.exports = app;

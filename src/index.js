const express = require("express");
require("./config/db/db");
require("dotenv").config();
const instructorRoutes = require("./routes/instructorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const otpRoutes = require("./routes/otpRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", instructorRoutes);
app.use("/api", studentRoutes);
app.use("/api", otpRoutes);

module.exports = app;

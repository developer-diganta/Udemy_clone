const express = require("express");
require("./config/db/db");
require("dotenv").config();
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const fs = require('fs');



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



const uploadsDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory);
}

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Use multer with the configured storage
const upload = multer({ storage: storage });

// Serve your static files, adjust the path as needed
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('file'), async (req, res) => {
  // 'file' is the field name in the form-data

  try {
    res.json({ message: 'File uploaded and saved successfully'});
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});











module.exports = app;

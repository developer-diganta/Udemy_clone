const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDirectory = path.join(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory);
}

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDirectory);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
    req.body.fileName = fileName;
  },
});

const upload = multer({ storage: storage });
console.log("here");
module.exports = {
  upload,
};

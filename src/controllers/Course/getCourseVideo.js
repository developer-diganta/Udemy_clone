const range = require("range-parser");
const path = require("path");
const fs = require("fs");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const getCourseVideo = (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "uploads",
    req.params.filename,
  );
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  const { range: reqRange } = req.headers;
  const ranges = range(fileSize, reqRange, { combine: true });

  if (ranges === -1) {
    // 416 Range Not Satisfiable
    res.status(416).end();
    return;
  }

  if (ranges === -2 || ranges.type !== "bytes" || ranges.length > 1) {
    // 416 Range Not Satisfiable
    res.status(416).end();
    return;
  }

  const { start, end } = ranges[0];

  const chunkSize = end - start + 1;
  const file = fs.createReadStream(filePath, { start, end });

  res.writeHead(206, {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": chunkSize,
    "Content-Type": "video/mp4",
  });

  file.pipe(res);
};

module.exports = {
  getCourseVideo,
};

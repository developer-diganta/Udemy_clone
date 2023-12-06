const Course = require("../../models/course");
const logger = require("../../logger/logger")

const execiseUpload = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const input = req.body.input;
  const output = req.body.output;
  const videoToAddAfter = parseInt(req.body.videoToAddAfter);
  const subsectionToBeUpdated = req.body.subsectionToBeUpdated;
  const courseID = req.body.courseId;
  console.log(req.body);
  try {
    const course = await Course.findById(courseID);
    course.lessons[subsectionToBeUpdated].videos.splice(
      videoToAddAfter + 1,
      0,
      {
        title,
        description,
        input,
        output,
        type:"exercise"
      },
      );
      
      
      await course.save();

    res.json({ message: "File uploaded and saved successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading file" });
  }
};

module.exports = {
  execiseUpload
};

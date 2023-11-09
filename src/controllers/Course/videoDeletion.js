const Course = require("../../models/course");
const deleteVideo = async (req, res) => {
  const indexOfVideo = req.body.indexOfVideo;
  const subsectionToBeUpdated = req.body.subsectionToBeUpdated;
  const courseId = req.body.courseId;

  try {
    const course = await Course.findById(courseId);
    const deletedVideo = course.lessons[subsectionToBeUpdated].videos.splice(
      indexOfVideo,
      1,
    );
    await course.save();
    console.log({deletedVideo})
    res.send({ deletedVideo });
  } catch (error) {
    res.status(400).send("Invalid Course")
    console.log(error);
  }
};

module.exports = {
  deleteVideo,
};

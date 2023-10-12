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
    res.send({ deletedVideo });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteVideo,
};

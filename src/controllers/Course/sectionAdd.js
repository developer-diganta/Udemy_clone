const Course = require("../../models/course");

const sectionAdd = async (req, res) => {
  try {
    const courseId = req.body.id;
    const index = parseInt(req.body.index);
    console.log("PPPP", courseId);
    const course = await Course.findById(courseId);
    console.log(course.lessons);
    course.lessons.splice(index + 1, 0, {
      title: req.body.title,
      videos: [
        {
          title:"Add Your Video Here",
          videoLink:"no link"
        }
      ],
    });
    await course.save();

    console.log(course);
    res.status(201).send(course);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sectionAdd,
};

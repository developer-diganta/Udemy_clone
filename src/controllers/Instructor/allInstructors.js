const Course = require("../../models/course");
const Instructor = require("../../models/instructor");

const allInstructors = async (req, res) => {
  try {
    const courses = await Course.find({});
    const instructorsListModel = await Instructor.find(
      {},
      { password: 0, tokens: 0 },
    );
    const instructorsList = [...instructorsListModel];
    const instructorMap = new Map();
    for (var i = 0; i < instructorsList.length; i++) {
      instructorsList[i] = { ...instructorsList[i]._doc, courses: [] };
    }
    for (var i = 0; i < instructorsList.length; i++) {
      for (var j = 0; j < courses.length; j++) {
        if (
          JSON.stringify(courses[j].instructor) ===
          JSON.stringify(instructorsList[i]._id)
        ) {
          instructorsList[i].courses.push(courses[j]);
        }
      }
    }
    const instructors = instructorsList;
    res.status(200).send(instructors);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  allInstructors,
};

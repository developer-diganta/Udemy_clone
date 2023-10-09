const Course = require("../../models/course");

const getCoursesController = async (req, res) => {
  try {
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;
    const limit = parseInt(req.query.limit);

    const sortObject = {};
    sortObject[sortBy] = sortOrder;

    const courses = await Course.find({}).sort(sortObject).limit(limit);

    res.send(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = { getCoursesController };

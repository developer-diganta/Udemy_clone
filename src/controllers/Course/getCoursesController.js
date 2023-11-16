const Course = require("../../models/course");

const getCoursesController = async (req, res) => {
  try {
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder;
    const limit = parseInt(req.query.limit);
    const sortObject = {};
    sortObject[sortBy] = parseInt(sortOrder);
    console.log(req.query)
    const c = await Course.find({})
    console.log(c)

    const courses = await Course.aggregate([
      {
        $match: { status: "active" } 
      },
      {
        $lookup: {
          from: "instructors",
          localField: "instructor",
          foreignField: "_id",
          as: "instructorInfo",
        },
      },
      {
        $unwind: "$instructorInfo",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          rating: 1,
          enrollments: 1,
          thumbnail: 1,
          instructor:1,
          price:1,
          instructorName: "$instructorInfo.name",
        },
      },
      {
        $sort: sortObject,
      },
      {
        $limit: limit,
      },
    ]);

    console.log(courses);

    // console.log(courses);

    res.send(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

module.exports = { getCoursesController };

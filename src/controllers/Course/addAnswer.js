const Course = require("../../models/course");

const addAnswer = async (req, res) => {
  // console.log(req.body);
  try {
    const update = await Course.findOneAndUpdate(
      {
        _id: req.body.courseId,
        "questionAnswers._id": req.body.questionId,
      },
      {
        $push: {
          "questionAnswers.$.answers": {
            answerer: req.student._id,
            userType: "Student",
            answer: req.body.answer,
          },
        },
      },
      { new: true }
    );
    console.log(update.questionAnswers[7])
    res.status(201).send(update)
  } catch (error) {
    res.status(400).send(error)
  }
};

module.exports = {
  addAnswer,
};

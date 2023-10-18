const Instructor = require("../../models/instructor");

const instructorLogout = async (req, res) => {
  const r = await Instructor.findByIdAndUpdate(req.instructor._id, {
    $pull: {
      tokens: { token: req.body.token },
    },
  });

  console.log(r);
  res.send({ message: "123" });
};

module.exports = {
  instructorLogout,
};

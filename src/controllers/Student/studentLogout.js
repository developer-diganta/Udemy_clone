const Student = require("../../models/student");

const studentLogout = async (req, res) => {
  const r = await Student.findByIdAndUpdate(req.student._id, {
    $pull: {
      tokens: { token: req.body.token },
    },
  });

  console.log(r);
  res.send({ message: "123" });
};

module.exports = {
  studentLogout,
};

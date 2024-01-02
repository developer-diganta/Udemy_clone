const Student = require("../../models/student");
const logger = require("../../logger/logger")

const studentLogout = async (req, res) => {
  try{
    const r = await Student.findByIdAndUpdate(req.student._id, {
      $pull: {
        tokens: { token: req.body.token },
      },
    });
  
    logger.logger.log("info","Student Logout")
    res.send({ message: "123" });
  }catch(error){
    console.log(error)
  }
};

module.exports = {
  studentLogout,
};

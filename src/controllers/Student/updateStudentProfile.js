const Student = require("../../models/student");
const logger = require("../../logger/logger")

const updatedStudentProfile = async (req,res)=>{
    try{
        const id = req.student._id;
        const changed = await Student.findByIdAndUpdate(id, req.body.updates, { new: true });
        logger.logger.log("info","Student Update Profile")
        res.status(201).send(changed)
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports = {
    updatedStudentProfile
}
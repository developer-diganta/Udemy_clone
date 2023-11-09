const Student = require("../../models/student");

const updatedStudentProfile = async (req,res)=>{
    try{
        const id = req.student._id;
        const changed = await Student.findByIdAndUpdate(id, req.body.updates, { new: true });
        res.status(201).send(changed)
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports = {
    updatedStudentProfile
}
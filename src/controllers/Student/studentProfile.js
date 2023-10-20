const Student = require("../../models/student")

const studentProfile = async (req,res)=>{
    try{
        const student = await Student.findById(req.query.id)
        res.status(200).send(student);
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports = {
    studentProfile
}
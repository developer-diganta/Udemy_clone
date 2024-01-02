const Instructor = require("../../models/instructor")

const getInstructorName = async (req,res) => {
    try{
        const instructor = await Instructor.findById(req.params.id,{_id:0,name:1});
        console.log(instructor)
        res.status(201).send(instructor.name);
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports = {
    getInstructorName
}
const Course = require("../../models/course")

const getAllCourses = async (req,res) => {
    try{
        const courses = await Course.find({instructor:req.query.id});
        res.status(201).send(courses);
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports = {
    getAllCourses
}
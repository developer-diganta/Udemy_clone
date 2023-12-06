const Course = require("../../models/course")
const logger = require("../../logger/logger")

const getAllCourses = async (req,res) => {
    try{
        const courses = await Course.find({instructor:req.query.id});
        logger.logger.log("info","Fetch All Courses")
        res.status(201).send(courses);
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports = {
    getAllCourses
}
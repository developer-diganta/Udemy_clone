const Course = require("../../models/course")
const logger = require("../../logger/logger")

 const publishCourse = async (req,res)=>{
    try{
        const update = await Course.findByIdAndUpdate(req.body.courseId, { status: "published" });
        logger.logger.log("info","Publish Course")

        res.status(201).send("Course Published for Review")
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
 }

 module.exports = {
    publishCourse
 }
const Course = require("../../models/course")
const logger = require("../../logger/logger")

const verifyCourseOwnership = async (req, res) => {
    try{
        const check = await Course.findById(req.body.courseId);
        logger.logger.log("info","Verify Course Ownership")
        if(JSON.stringify(check.instructor) === JSON.stringify(req.body.id)){
            res.status(201).send("allowed")
        }else{
            res.status(404).send("not allowed")
        }
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports = {
    verifyCourseOwnership
}
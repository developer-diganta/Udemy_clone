const Course = require("../../models/course")

const verifyCourseOwnership = async (req, res) => {
    try{
        const check = await Course.findById(req.body.courseId);
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
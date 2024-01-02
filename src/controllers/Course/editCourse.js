const Course = require("../../models/course")
const logger = require("../../logger/logger")

const editCourse = async(req,res) => {
    console.log(req.body.updates.courseMaterials)
    try{
        const course = await Course.findById(req.body.courseId);

        for(const key in req.body.updates){
            course[key] = req.body.updates[key];
        }
        await course.save();
        res.status(200).send("Updated Course")
    }catch(error){
        console.log(error)
        res.status(400).send(error)

    }
}

module.exports = {
    editCourse
}


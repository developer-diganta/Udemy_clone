const Course = require("../../models/course")

const editCourse = async(req,res) => {
    try{
        const course = await Course.findById(req.body.courseId);
        for(const key in req.body.updates){
            course[key] = req.body.updates[key];
        }
        console.log(course)
        await course.save();
    }catch(error){

    }
}

module.exports = {
    editCourse
}


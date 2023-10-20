const Course = require("../../models/course");

const sectionDeletion = async (req,res) => {
    try{
        const courseId = req.body.courseId;
        const sectionId = req.body.sectionId;
        const course = await Course.findById(courseId);
        course.lessons.splice(sectionId,1);
        await course.save();
        res.status(201).send({"message":"Section Deleted"});
    }catch(error){
        res.status(400).send(error);
    }
}

module.exports = {
    sectionDeletion
}
const logger = require("../../logger/logger")

const deleteNotes = async (req,res)=>{
    try{
        const courseId = req.body.courseId;
        const noteId = req.body.note;
        const courseIndex = await req.student.enrolled.findIndex(course => JSON.stringify(course.id) === JSON.stringify(courseId));
        req.student.enrolled[courseIndex].notes.splice(noteId,1);
        await req.student.save();
        logger.logger.log("info","Delete Note")
        res.status(200).send("Success");
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}

module.exports = {
    deleteNotes
}
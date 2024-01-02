const logger = require("../../logger/logger")

const studentUpdateNotes = async (req,res) => {
    try{
        const courseId = req.body.courseId;
        const student = req.student;
        const noteIndex = req.body.noteIndex;
        const courseIndex = await req.student.enrolled.findIndex(course => JSON.stringify(course.id) === JSON.stringify(req.body.courseId));
        student.enrolled[courseIndex].notes[noteIndex]={ header:req.body.note.header, description: req.body.note.description };
        await student.save();
        logger.logger.log("info","Student Update Notes")
        res.status(201).send(student);


    }catch(error){
        res.status(400).send("Internal Error")
    }
}

module.exports = {
    studentUpdateNotes
}
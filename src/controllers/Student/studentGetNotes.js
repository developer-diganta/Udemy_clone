const logger = require("../../logger/logger")

const studentGetNotes = async (req,res)=>{
    try{
        const courseIndex = await req.student.enrolled.findIndex(course => JSON.stringify(course.id) === JSON.stringify(req.params.courseId));
        const notes =  req.student.enrolled[courseIndex].notes;
        logger.logger.log("info","Fetch Student Notes")
        res.status(200).send(notes);
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}

module.exports = {
    studentGetNotes
}
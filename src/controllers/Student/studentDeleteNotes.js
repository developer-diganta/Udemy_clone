const deleteNotes = async (req,res)=>{
    try{
        console.log("QQQQQQQQQQQQQQQQQQQQQQQWWWWWWWWWWWWWWWWWWWWWWWWWW")
        const courseId = req.body.courseId;
        const noteId = req.body.note;
        console.log("TTTTTTTTTTTTTT",noteId)
        const courseIndex = await req.student.enrolled.findIndex(course => JSON.stringify(course.id) === JSON.stringify(courseId));
        req.student.enrolled[courseIndex].notes.splice(noteId,1);
        console.log(req.student.enrolled[courseIndex].notes)
        await req.student.save();
        res.status(200).send("Success");
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}

module.exports = {
    deleteNotes
}
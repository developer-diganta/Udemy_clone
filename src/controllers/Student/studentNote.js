const studentNote = async (req,res)=>{
    try{
 
        const courseIndex = await req.student.enrolled.findIndex(course => JSON.stringify(course.id) === JSON.stringify(req.body.courseId));
    console.log(req.student.enrolled[courseIndex])
        req.student.enrolled[courseIndex].notes.push({ header:req.body.note.header, description: req.body.note.description });

        await req.student.save();
        res.status(201).send(req.student)
    }catch(error){
        console.log(error)
        res.status(400).send("Internal error")
    }
}

module.exports = {
    studentNote
}
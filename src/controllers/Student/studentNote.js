const studentNote = async (req,res)=>{
    try{
        console.log("{}{{}}}",req.body)
        const courseIndex = await req.student.enrolled.findIndex(course => JSON.stringify(course.id) === JSON.stringify(req.body.courseId));
    console.log(req.student.enrolled[courseIndex])
        req.student.enrolled[courseIndex].notes.push({ header:req.body.note.header, description: req.body.note.description });

        console.log(  req.student.enrolled[courseIndex])
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
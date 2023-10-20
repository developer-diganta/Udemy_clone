const studentCourseStatus = async (req,res) => {
    try{
        console.log(req.student)
        await req.student.enrolled[parseInt(req.body.section)].progress.push({
            section:parseInt(req.body.section),
            videoNumber:parseInt(req.body.videoNumber)
        })
        const y = await req.student.save()
        console.log(y);
        res.status(201).send({"message":"Updated"})
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}

module.exports = {
    studentCourseStatus
}
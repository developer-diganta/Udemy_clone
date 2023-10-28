const Course = require("../../models/course")

const updateStatus = async (req,res)=>{
    try{
        console.log(req.body)
        const course = await Course.findOneAndUpdate({_id:req.body.courseId.id},{status:"active"});
        console.log(course)
        res.status(200).send(course)
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}

module.exports = {
    updateStatus
}
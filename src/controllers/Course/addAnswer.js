const Course = require("../../models/course")

const addAnswer = async(req,res)=>{
    console.log(req.body)
    try{
        const update = await Course.updateOne({
            _id:req.body.courseId,
            'questionAnswers._id':req.body.questionId
        },
        {
            $push:{
                'questionAnswers.$.answers':{
                    answerer:req.student._id,
                    userType:"Student",
                    answer:req.body.answer,
                }
            }
        }
        )
        console.log(update)
    }catch(error){
        console.log(error)
    }
}


module.exports = {
    addAnswer
}
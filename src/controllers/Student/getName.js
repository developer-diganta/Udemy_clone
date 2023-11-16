const Student = require("../../models/student")

const getName = async(req,res)=>{
    try{
        console.log(">>>>>>>>>>>>>",req.query.id)
        const student = await Student.findById(req.query.id);
        res.send(student.name)
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = {
    getName
}
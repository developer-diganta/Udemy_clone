const Student = require("../../models/student")
const logger = require("../../logger/logger")

const getName = async(req,res)=>{
    try{
        const student = await Student.findById(req.query.id);
        logger.logger.log("info","Get Student Name")
        res.send(student.name)
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
}

module.exports = {
    getName
}
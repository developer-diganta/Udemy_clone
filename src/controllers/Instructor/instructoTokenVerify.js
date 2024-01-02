const logger = require("../../logger/logger")

const instructorTokenVerify= async (req,res) => {
    try{
        let message = ""
        if(req.instructor.status==="registered"){
            message="registered"
        }else{
            message="pending"
        }
        logger.logger.log("info","Instructor Token Verification")
        res.status(200).send(message)
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports  ={
    instructorTokenVerify
}
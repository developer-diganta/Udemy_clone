const studentTokenVerify= async (req,res) => {
    try{
        let message = ""
        if(req.student.status==="registered"){
            message="registered"
        }else{
            message="pending"
        }
        console.log(message)
        res.status(200).send(message)
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports  ={
    studentTokenVerify
}
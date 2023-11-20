const adminVerify = async (req,res)=>{
    try{
        res.status(200).send("Verified")
    }catch(error){
        res.status(400).send(error);
    }
}

module.exports = {
    adminVerify
}
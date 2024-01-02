const Payment = require("../../models/payment");
const logger = require("../../logger/logger")

const coursePurchases = async (req,res) => {
    try{
        const purchases = await Payment.find({course:req.body.courseId});
        logger.logger.log("info","Fetch Payment")
        res.status(201).send(purchases);
    }catch(error){
        res.status(400).send(purchases)
    }
}

module.exports = {
    coursePurchases
}
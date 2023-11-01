const Payment = require("../../models/payment");

const coursePurchases = async (req,res) => {
    try{
        const purchases = await Payment.find({course:req.body.courseId});
        console.log(purchases)
        res.status(201).send(purchases);
    }catch(error){
        res.status(400).send(purchases)
    }
}

module.exports = {
    coursePurchases
}
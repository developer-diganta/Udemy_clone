/*
*****SCHEMA FOR PAYMENT*****
    
    student: student who made payment, linked to student collection via student id

    course: course which was bought, linked to course collection via course id

    paymentDetails: to be filled later

*/
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  paymentDetails: {
    // To be filled later depending on payment gateway implemented
    checkoutSession: {
      type: String,
    },
    price: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});
const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;

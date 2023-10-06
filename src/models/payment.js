/*
*****SCHEMA FOR PAYMENT*****

    student: student who made payment, linked to student collection via student
id

    course: course which was bought, linked to course collection via course id

    paymentDetails: to be filled later

*/

const Payment = {
  student : {
    type : mongoose.Schemas.Type.objectId,
    ref : "Student",
  },
  course : {
    type : mongoose.Schemas.Type.objectId,
    ref : "Course",
  },
  paymentDetails : {
      // To be filled later depending on payment gateway implemented
  },
};

export default Payment;

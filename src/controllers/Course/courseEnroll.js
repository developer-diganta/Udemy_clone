const Course = require("../../models/course");

const courseEnroll = async (req, res) => {
  const course = await Course.findById(req.body.courseId);
  const student = req.student;

  const enrolledIds = student.enrolled.map((course) => course.id);

  if (enrolledIds.includes(course._id)) {
    res.status(400).send({ message: "Already Enrolled" });
    return;
  }

  // const sig = request.headers['stripe-signature'];

  // let event;

  // try {
  //   event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  //   // console.log(event)
  // } catch (err) {
  //   // console.log(err)
  //   response.status(400).send(`Webhook Error: ${err.message}`);
  //   return;
  // }

  // switch (event.type) {
  //   case 'payment_intent.succeeded':
  //     const paymentIntentSucceeded = event.data.object;
  //     console.log("HERE")
  //     break;

  //   default:
  //     console.log(`Unhandled event type ${event.type}`);
  // }

  // response.send();
};

module.exports = {
  courseEnroll,
};

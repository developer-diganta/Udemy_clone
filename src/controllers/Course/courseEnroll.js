const Course = require("../../models/course");
let endpointSecret = process.env.END_POINT_SECRET;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const courseEnroll = async (req, res) => {
  console.log(req.body)
  const course = await Course.findById(req.body.courseId);

  const student = req.student;

  const enrolledIds = student.enrolled.map((course) => course.id);

  if (enrolledIds.includes(course._id)) {
    throw new Error("Already Enrolled")
    // res.status(400).send({ error: "Already Enrolled" });
    return;
  }

  try {
    const priceId = req.body.priceId;
    console.log(priceId);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_intent_data: {
        metadata: {
          studentId: req.body.studentId,
          courseId: req.body.courseId,
        },
      },
      success_url: `http://localhost:8080/student/learn?courseId=${req.body.courseId}&payment=success`,
      cancel_url: `http://localhost:8080/student/enroll/${req.body.courseId}?payment=failed`,
    });
    console.log(session);
    res.status(200).send({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }


};

module.exports = {
  courseEnroll,
};

const Instructor = require("../../models/instructor");
const Course = require("../../models/course");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const logger = require("../../logger/logger")

const instructorCourseAddition = async (req, res) => {
  try {
    const { _id, email, token, course } = req.body;
    const newCourse = new Course({ ...course, instructor: _id });

    const product = await stripe.products.create({
      name: course.title,
      type: "service",
      description: course.description,
    });

    const discountedPrice =
      course.price - Math.ceil((course.discount * course.price) / 100);

    const priceObject = {
      product: product.id,
      unit_amount: discountedPrice,
      currency: "inr",
    };

    const price = await stripe.prices.create(priceObject);

    newCourse.stripeProductId = product.id;
    newCourse.stripePriceId = price.id;

    const courseSaveResponse = await newCourse.save();
    logger.logger.log("info","Add Course")

    res.status(201).send({
      message: "Course Added",
      _id: newCourse._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  instructorCourseAddition,
};

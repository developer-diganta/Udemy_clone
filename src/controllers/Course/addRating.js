const Course = require("../../models/course");
const logger = require("../../logger/logger")

const addRating = async (req, res) => {
  try {
    const course = await Course.findById(req.body.courseId);
    const checkForPreviousReview = course.reviews.filter(
      (review) =>
        JSON.stringify(review.reviewer) === JSON.stringify(req.student._id),
    );
    console.log(checkForPreviousReview);
    if (checkForPreviousReview.length) {
      const indexOfMatchedReview = course.reviews.findIndex(
        (review) =>
          JSON.stringify(review.reviewer) === JSON.stringify(req.student._id),
      );
      course.reviews[indexOfMatchedReview] = {
        reviewer: req.student._id,
        rating: req.body.rating,
        review: req.body.review,
      };
    } else {
      course.reviews.push({
        reviewer: req.student._id,
        rating: req.body.rating,
        review: req.body.review,
      });
    }
    await course.save();
    logger.logger.log("info","Add Rating")

    res.status(200).send(course);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  addRating,
};

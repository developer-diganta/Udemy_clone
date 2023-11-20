const request = require('supertest');
const app = require('../../src/index');
const Course = require('../../src/models/course');
const Student = require('../../src/models/student');
const jwt = require('jsonwebtoken');
const assert = require('assert');

describe('addRating function', () => {
  let testCourse;
  let testStudent;
  let testToken;
  let testStudent1
  beforeEach(async () => {
    testStudent1 = await Student.create({
        name: 'Test Student',
        email: 'test@example1.com',
        password: 'testPassword123!',

      });

    testCourse = await Course.create({
        title: 'Test Course',
        reviews: [{review:"Great",rating:2,reviewer:testStudent1._id}],
        stripePriceId: "12345",
        stripeProductId: "12345",
      });

      
    testStudent = await Student.create({
        name: 'Test Student',
        email: 'test@example.com',
        password: 'testPassword123!',
        enrolledCourses: [{ courseId: testCourse._id }],
      });




    testToken = jwt.sign({ _id: testStudent._id }, process.env.SECRET_KEY);
    await Student.updateOne(
      { _id: testStudent._id },
      {
        $push: {
          tokens: { token: testToken },
        },
      }
    );
  });

  afterEach(async () => {
    await Course.findByIdAndDelete(testCourse._id);
    await Student.findByIdAndDelete(testStudent._id);
    await Student.findByIdAndDelete(testStudent1._id);
  });

  it('should add a rating and review for a course', async () => {
    const requestBody = {
      courseId: testCourse._id,
      rating: 2,
      review: 'Great',
      token:testToken,
      email:"test@example.com"
    };

    const response = await request(app)
      .patch('/api/student/course/review')
      .set('Authorization', `Bearer ${testToken}`)
      .send(requestBody);

    assert.strictEqual(response.status, 200);

    const updatedCourse = await Course.findById(testCourse._id);
    assert.strictEqual(updatedCourse.reviews.length, 2);
    assert.strictEqual(updatedCourse.reviews[0].reviewer.toString(), testStudent1._id.toString());
    assert.strictEqual(updatedCourse.reviews[0].rating, requestBody.rating);
    assert.strictEqual(updatedCourse.reviews[0].review, requestBody.review);
  });

  it('should not add a rating and review for an unverified course', async () => {
    const requestBody = {
      courseId: "testCourse._id",
      rating: 4.5,
      review: 'This course was excellent!',
      token:testToken,
      email:"test@example.com"
    };

    const response = await request(app)
      .patch('/api/student/course/review')
      .set('Authorization', `Bearer ${testToken}`)
      .send(requestBody);

    assert.strictEqual(response.status, 400);
  });
});

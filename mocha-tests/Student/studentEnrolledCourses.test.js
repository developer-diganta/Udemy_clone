const request = require('supertest');
const app = require('../../src/index');
const Student = require('../../src/models/student');
const Course = require('../../src/models/course');
const assert = require('assert');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")
describe('studentEnrolledCourses function', () => {
  let testStudent;
  let testCourse;
    let testToken;
  beforeEach(async () => {
    testCourse = await Course.create({
        title: 'Test Course',
        status: 'pending',
        stripePriceId: "12345",
        stripeProductId: "12345",
      });
  
      testStudent = await Student.create({
        name: 'Test Student',
        password: 'ABC124!aaa',
        email: 'test@test.com',
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
  });

  it('should return enrolled courses for a student', async () => {
    const response = await request(app)
      .post('/api/student/enrolledcourses')
    .send({
        token:testToken,
        email:"test@test.com"
    })
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.length, 0);
    // Add more assertions based on the expected behavior
  });

//   it('should handle errors and return status code 400', async () => {
//     const invalidStudentId = new mongoose.Types.ObjectId();
//     const response = await request(app)
//     .post('/api/student/enrolledcourses')
//     .send({
//         token:testToken,
//         email:"test222@test.com"
//     })
//     assert.strictEqual(response.status, 400);
//     // Add assertions to validate the error handling behavior
//   });


});

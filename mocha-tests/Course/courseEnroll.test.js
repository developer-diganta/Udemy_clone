// const { courseEnroll } = require('../../src/controllers/Course/courseEnroll'); // Import the courseEnroll function
// const Course = require('../../src/models/course');
// const Student = require('../../src/models/student');
// const jwt = require('jsonwebtoken');
// const assert = require('assert');
// const mongoose = require('mongoose');

// describe('courseEnroll function', () => {
//   let testCourse;
//   let testStudent;
//   let testToken;
//   let qId = new mongoose.Types.ObjectId();

//   beforeEach(async () => {
//     testCourse = await Course.create({
//       title: 'Test Course',
//       questionAnswers: [
//         {
//           _id: qId,
//           answers: [],
//         },
//       ],
//       stripePriceId: "12345",
//       stripeProductId: "12345",
//     });

//     testStudent = await Student.create({
//       name: 'Test Student',
//       password: "ABC124!aaa",
//       email: "test@test.com",
//       enrolledCourses: [{ courseId: testCourse._id }],
//     });

//     testToken = jwt.sign({ _id: testStudent._id }, process.env.SECRET_KEY);
//     await Student.updateOne(
//       { _id: testStudent._id },
//       {
//         $push: {
//           tokens: { token: testToken },
//         },
//       }
//     );

//   });

//   afterEach(async () => {
//     await Course.findByIdAndDelete(testCourse._id);
//     await Student.findByIdAndDelete(testStudent._id);
//   });

//   it('should enroll a student to a course and return a checkout URL', async () => {
//     const req = {
//       body: {
//         courseId: testCourse._id,
//         priceId: "price_123", // Replace with a valid Stripe price ID
//         studentId: testStudent._id,
//       },
//       student: testStudent // Mocking the student object in req
//     };

//     const res = {
//       status: function (statusCode) {
//         this.statusCode = statusCode;
//         return this;
//       },
//       send: function (data) {
//         this.data = data;
//         return this;
//       }
//     };

//     await courseEnroll(req, res);

//     assert.strictEqual(res.statusCode, 200);
//     assert.ok(res.data.url); // Assert that the response contains a URL

//     // Additional assertions as needed based on the response structure

//     // You might also want to assert that the student is properly enrolled in the course
//     const updatedStudent = await Student.findById(testStudent._id);
//     const enrolledCourseIds = updatedStudent.enrolledCourses.map(course => course.courseId.toString());
//     assert.ok(enrolledCourseIds.includes(testCourse._id.toString()));
//   });

//   // Add more test cases to cover other scenarios and edge cases

// });

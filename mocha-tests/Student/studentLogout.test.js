const request = require('supertest');
const app = require('../../src/index');
const Student = require('../../src/models/student');
const Course = require('../../src/models/course');
const jwt = require('jsonwebtoken');
const assert = require('assert');

describe('studentLogout function', () => {
  let testStudent;
  let testCourse;
  let testToken;

  beforeEach(async () => {
    testCourse = await Course.create({
      title: 'Test Course',
      status: 'pending',
      stripePriceId: '12345',
      stripeProductId: '12345',
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

  it('should remove token on student logout', async () => {
    const response = await request(app)
      .patch('/api/student/logout')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ token: testToken });

    assert.strictEqual(response.status, 200);
    const updatedStudent = await Student.findById(testStudent._id);
    assert.strictEqual(updatedStudent.tokens.length, 0);
  });

//   it('should handle error for invalid token', async () => {
//     const response = await request(app)
//       .patch('/api/student/logout')
//       .set('Authorization', `Bearer ${testToken}`)
//       .send({ token: 'invalidToken' });

//     assert.strictEqual(response.status, 200); 
//     const updatedStudent = await Student.findById(testStudent._id);
//     assert.strictEqual(updatedStudent.tokens.length, 1); 
//   });

});
const request = require('supertest');
const app = require('../../src/index');
const Student = require('../../src/models/student');
const assert = require('assert');
const jwt = require('jsonwebtoken');

describe('getName function', () => {
  let testStudent;
  let testToken;

  beforeEach(async () => {
    testStudent = await Student.create({
      name: 'Test Student',
      password: 'ABC124!aaa',
      email: 'test@test.com',
    //   enrolledCourses: [{ courseId: testCourse._id }],
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
    await Student.findByIdAndDelete(testStudent._id);
  });

  it('should get the name of a student by ID', async () => {
    const response = await request(app)
      .get(`/api/student/name?id=${testStudent._id}`)

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, 'Test Student');
    // Add more assertions as needed based on the expected behavior
  });

  it('should handle errors and return status code 500', async () => {
    const response = await request(app)
      .get('/api/student/name')
      .query({ id: 'invalid_student_id' });

    assert.strictEqual(response.status, 500);
    // Add assertions to validate the error handling behavior
  });

  // Add more test cases to cover different scenarios and edge cases

});

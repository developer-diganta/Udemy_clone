const assert = require('assert');
const request = require('supertest');
const app = require('../../src/index');
const Course = require('../../src/models/course');
const Student = require('../../src/models/student');
const jwt = require('jsonwebtoken');

describe('Course API - Add Question', () => {
  let testCourse;
  let testStudent;
let testToken;
  beforeEach(async () => {
    testCourse = await Course.create({
      title: 'Test Course',
      questionAnswers: [],
      stripePriceId: "12345",
      stripeProductId: "12345",
    });

    testStudent = await Student.create({
      name: 'Test Student',
      email: 'test@example.com',
      password: 'testPassword123!',
      enrolled: [{ id: testCourse._id }],
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

  it('should add a question for an enrolled student in a course', async () => {
    const requestBody = {
      courseId: testCourse._id,
      title: 'Test Question Title',
      token:testToken
    };

    const response = await request(app)
      .patch('/api/student/course/question')
      .set('Authorization', `Bearer ${testStudent.generateAuthToken()}`)
      .send(requestBody);

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.course.questionAnswers.length, 1);
    assert.strictEqual(response.body.course.questionAnswers[0].title, requestBody.title);
  });

  it('should not add a question for a student not enrolled in a course', async () => {
    const otherCourse = await Course.create({
      title: 'Other Course',
      questionAnswers: [],
      stripePriceId: "12345",
      stripeProductId: "12345",
    });

    const requestBody = {
      courseId: "otherCourse._id",
      title: 'Test Question Title',
      description: 'Test Question Description',
      token:testToken
    };

    const response = await request(app)
      .patch('/api/student/course/question')
      .set('Authorization', `Bearer ${testStudent.generateAuthToken()}`)
      .send(requestBody);

    assert.strictEqual(response.status, 400);

    // Add more assertions as needed

    await Course.findByIdAndDelete(otherCourse._id);
  });
});

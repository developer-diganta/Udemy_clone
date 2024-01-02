const request = require('supertest');
const app = require('../../src/index');
const Course = require('../../src/models/course');
const Student = require('../../src/models/student');
const { default: mongoose } = require('mongoose');
const jwt = require("jsonwebtoken")
const assert = require('assert');

describe('addAnswer function', () => {
  let testCourse;
  let testStudent;
  let testToken;
    let qId = new mongoose.Types.ObjectId()
  beforeEach(async () => {
    testCourse = await Course.create({
      title: 'Test Course',
      questionAnswers: [
        {
          _id: qId, 
          answers: [],
        },
      ],
      stripePriceId: "12345",
      stripeProductId: "12345",
    });

    testStudent = await Student.create({
      name: 'Test Student',
      password:"ABC124!aaa",
      email:"test@test.com",
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

  it('should add an answer to a question', async () => {
    const requestBody = {
      courseId: testCourse._id,
      questionId: qId, 
      answer: 'This is an answer.',
      token:testToken,
      email:"test@test.com"
    };

    const response = await request(app)
      .patch('/api/student/course/question/answer')
      .set('Authorization', `Bearer ${testStudent.generateAuthToken()}`)
      .send(requestBody);

    assert.strictEqual(response.status, 201);

    assert.strictEqual(response.body.questionAnswers[0].answers.length, 1);
    assert.strictEqual(
      response.body.questionAnswers[0].answers[0].answer,
      requestBody.answer
    );
  });

  it('should generate an error when there is an answer to an invalid question', async () => {
    const requestBody = {
      courseId: testCourse._id,
      questionId: "qId", 
      answer: 'This is an answer.',
      token:testToken,
      email:"test@test.com"
    };

    const response = await request(app)
      .patch('/api/student/course/question/answer')
      .set('Authorization', `Bearer ${testStudent.generateAuthToken()}`)
      .send(requestBody);

    assert.strictEqual(response.status, 400);


  });
});

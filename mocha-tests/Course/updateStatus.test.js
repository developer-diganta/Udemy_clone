const request = require('supertest');
const app = require('../../src/index');
const Course = require('../../src/models/course');
const Student = require('../../src/models/student');
const jwt = require('jsonwebtoken');
const assert = require('assert');
const mongoose = require('mongoose');
const Instructor = require('../../src/models/instructor');

describe('updateStatus function', () => {
  let testCourse;
  let instructor;
  let instructorToken;
  let testToken;
  let adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVkZW15Y2xvbmVhZG1pbiIsImlhdCI6MTcwMDQ3ODg2NH0.61uUap2aNi4m27JCWNY9gUHphz4cd_WVxowQDvArujU"
  const instructorMock = {
    name: "John Doe",
    email:"test@test.com",
    password: "StrongPassword123!",
    bio: "I am a passionate instructor with expertise in various subjects.",
    profileImage: "https://example.com/profile-image.jpg",
    socialLinks: [
      {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/johndoe/",
      },
      {
        name: "Twitter",
        link: "https://twitter.com/johndoe/",
      },
    ],
    tokens:[]
  };

  beforeEach(async () => {
    instructor = await Instructor.create(instructorMock);

    testCourse = await Course.create({
      title: 'Test Course',
      status: 'pending',
      stripePriceId: "12345",
      stripeProductId: "12345",
      instructor:instructor._id
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
    await Instructor.deleteMany();
  });

  it('should update the status of a course to "active"', async () => {
    const requestBody = {
      courseId: {id:testCourse._id},
      token:adminToken
    };

    const response = await request(app)
      .patch('/api/admin/course/status')
      .set('Authorization', `Bearer ${testToken}`)
      .send(requestBody);

    assert.strictEqual(response.status, 200);
  });

  it('should handle errors and return status code 400 for invalid course ID', async () => {
    const requestBody = {
      courseId: 'NOSUCHCOURSE',
      token:testToken

    };

    const response = await request(app)
    .patch('/api/admin/course/status')
    .set('Authorization', `Bearer ${testToken}`)
      .send(requestBody);

    assert.strictEqual(response.status, 400);
  });


});

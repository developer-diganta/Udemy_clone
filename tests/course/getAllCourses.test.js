const request = require('supertest');
const app = require('../../src/index');
const instructorMock = require('../utils/instructorMock');
const Instructor = require('../../src/models/instructor');
const Course = require('../../src/models/course');
const jwt = require("jsonwebtoken")
describe('Get All Courses API', () => {
  let instructor;
  let instructorToken;

  beforeAll(async () => {
    instructor = await Instructor.create(instructorMock);


    await Course.create([
      {
        title: 'Course 1',
        instructor: instructor._id,
        stripePriceId: "12345",
        stripeProductId: "12345",
      },
      {
        title: 'Course 2',
        instructor: instructor._id,
        stripePriceId: "12346",
        stripeProductId: "12346",
      },
    ]);
  });

  afterAll(async () => {
    await Instructor.findOneAndDelete({ email: instructorMock.email });

    await Course.deleteMany({});
  });

  it('should get all courses', async () => {
    const response = await request(app)
      .get('/api/courses/all')

    expect(response.status).toBe(201);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(0); 
  });
});

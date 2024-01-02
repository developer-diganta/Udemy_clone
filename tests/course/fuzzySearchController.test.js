const request = require('supertest');
const app = require('../../src/index');
const Course = require('../../src/models/course');
const Instructor = require('../../src/models/instructor');
const instructorMock = require('../utils/instructorMock');

describe('Fuzzy Search Courses API', () => {
    let instructor;
  beforeAll(async () => {
    instructor = await Instructor.create(instructorMock);

    await Course.create([
      {
        title: 'Mathematics for Beginners',
        description: 'Learn basic mathematics concepts.',
        instructor:instructor._id,
        stripePriceId: "12346",
        stripeProductId: "12346",
        status:"active"
      },
      {
        title: 'Science Explorations',
        description: 'Discover the wonders of science.',
        instructor:instructor._id,
        stripePriceId: "12346",
        stripeProductId: "12346",
        status:"active"
      },
      {
        title: 'History Uncovered',
        description: 'Explore historical events and figures.',
        instructor:instructor._id,
        stripePriceId: "12346",
        stripeProductId: "12346",
        status:"active"
        // Add other properties as needed
      },
    ]);
  });

  afterAll(async () => {
    await Instructor.deleteMany({})
    await Course.deleteMany({});
  });

  it('should perform fuzzy search for courses', async () => {
    const searchQuery = 'math';
    const response = await request(app)
      .get(`/api/courses/fuzzysearch?search=${searchQuery}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    console.log(response.body[0].item)
    expect(response.body[0].item.title).toEqual('Mathematics for Beginners');

    expect(response.body[0].item.title).not.toBe('Science Explorations');

  });

  it('should handle no results for invalid search query', async () => {
    const searchQuery = 'invalidsearchquery';
    const response = await request(app)
      .get(`/api/courses/fuzzysearch?search=${searchQuery}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(0);
  });
});

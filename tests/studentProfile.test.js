const request = require('supertest');
const app = require('../src/index');
const Student = require('../src/models/student');
const jwt = require('jsonwebtoken');

describe('Student API Test', () => {
  let testStudent;
  let testToken;

  beforeAll(async () => {
    testStudent = await Student.create({
      name: 'Test Student',
      email: 'test@example.com',
      password: 'testPassword123!',
      enrolled: [
        {
          id: '65279382e113bf4157d4df2f',
          progress: [],
          enrolledDate: new Date(),
        },
      ],
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

  afterAll(async () => {
    await Student.findOneAndDelete({ email: testStudent.email });
  });

  it('should update student course status', async () => {
    const response = await request(app)
      .get(`/api/student?id=${testStudent._id}`)

    console.log(response.body)
      expect(response.status).toBe(200);
      expect(response.body.name).toEqual("Test Student")
      expect(response.body.email).toEqual("test@example.com")
      expect(response.body).toHaveProperty('wishlist');
      expect(response.body).toHaveProperty('enrolled');
      expect(Array.isArray(response.body.wishlist)).toBe(true);
      expect(response.body).toHaveProperty('status', 'pending');
      expect(response.body).toHaveProperty('completed');
      expect(Array.isArray(response.body.completed)).toBe(true);
      expect(response.body).toHaveProperty('createdAt');
      expect(typeof response.body.createdAt).toBe('string');

  });
});

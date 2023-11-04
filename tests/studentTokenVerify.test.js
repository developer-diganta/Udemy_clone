const request = require('supertest');
const app = require('../src/index'); // Replace with the actual path to your app's entry point
const Student = require('../src/models/student');
const jwt = require('jsonwebtoken');

describe('Student Token Verification API Test', () => {
  let testStudent;
  let testToken;

  beforeAll(async () => {
    // Create a test student
    testStudent = await Student.create({
      name: 'Test Student',
      email: 'test@example.com',
      password: 'testPassword123!',
      status: 'pending', // Set the student's status to 'pending'
    });

    // Generate a JWT token for the test student
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

  it('should verify student token and return the status', async () => {
    const response = await request(app)
      .post('/api/student/verify')
      .send({token:testToken,email: "test@example.com", _id:testStudent._id});
        
    expect(response.status).toBe(200);
    expect(response.text).toBe('pending');
  });

}); 

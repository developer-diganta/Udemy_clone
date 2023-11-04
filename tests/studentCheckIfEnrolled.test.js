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
      enrolled:[
        {
            id:"65279382e113bf4157d4df2f"
        }
      ]
    });
    console.log(testStudent)
    testToken = jwt.sign({ _id: testStudent._id }, process.env.SECRET_KEY);
    await Student.updateOne(
        { _id: testStudent._id },
        {
          $push: {
            tokens: { token: testToken }
          }
        }
      );
  });

  afterAll(async () => {
    await Student.findOneAndDelete({ email: testStudent.email });
  });

  it('should check if a student is enrolled in a course', async () => {

    const response = await request(app)
      .post('/api/student/checkifenrolled')
      .send({ courseId: 'courseID', token:testToken,email: "test@example.com", _id:testStudent._id}); 

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('enrolled', true);
    
  });

});

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
      .patch('/api/student/statusupdate')
      .send({
        courseId: '65279382e113bf4157d4df2f',
        section: 1,
        videoNumber: 2,
        token: testToken,
        _id:testStudent._id
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Updated');
    
    const updatedStudent = await Student.findOne({ _id: testStudent._id });
      console.log(updatedStudent.enrolled[0].progress.length)

    expect(updatedStudent.enrolled[0].progress.length).toBe(1); 
    expect(updatedStudent.enrolled[0].progress[0].section).toEqual(1);
    expect(updatedStudent.enrolled[0].progress[0].videoNumber).toEqual(2);
  });
});

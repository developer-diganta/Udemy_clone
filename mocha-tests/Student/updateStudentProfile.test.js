const request = require('supertest');
const app = require('../../src/index');
const Student = require('../../src/models/student');
const assert = require('assert');
const jwt = require("jsonwebtoken")
describe('updatedStudentProfile function', () => {
  let testStudent;

  beforeEach(async () => {


    testStudent = await Student.create({
      name: 'Test Student',
      password: 'ABC124!aaa',
      email: 'test@test.com',
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

  it('should update the student profile', async () => {
    const updates = {
      name: 'Updated Name',
      email: 'updated@test.com',
    };

    const response = await request(app)
      .patch(`/api/student/profile`)
      .send({ 
        token:testToken,
        email:"test@test.com",
        updates
     });

    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.name, updates.name);
    assert.strictEqual(response.body.email, updates.email);

    const updatedStudent = await Student.findById(testStudent._id);
    assert.strictEqual(updatedStudent.name, updates.name);
    assert.strictEqual(updatedStudent.email, updates.email);
  });



});

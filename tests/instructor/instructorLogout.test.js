const request = require("supertest");
const app = require("../../src/index"); // Replace with the actual path to your app's entry point
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");

describe("Instructor API - Logout", () => {
  let instructor;
  let instructorToken;

  beforeAll(async () => {
    instructor = await Instructor.create(instructorMock);

    instructorToken = jwt.sign({ _id: instructor._id }, process.env.SECRET_KEY);

    await Instructor.updateOne(
      { _id: instructor._id },
      {
        $push: {
          tokens: { token: instructorToken }
        }
      }
    );
  });

  afterAll(async () => {
    await Instructor.findOneAndDelete({ email: instructorMock.email });
  });

  it("should log out the instructor and remove the token", async () => {
    const response = await request(app)
      .patch("/api/instructor/logout")
      .send({ token: instructorToken, _id:instructor._id });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "123");

    const updatedInstructor = await Instructor.findById(instructor._id);
    const matchingToken = updatedInstructor.tokens.find(
      (t) => t.token === instructorToken
    );
    expect(matchingToken).toBeUndefined();
  });
});
const request = require("supertest");
const app = require("../../src/index");
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");

describe("Instructor API - Get Profile", () => {
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

  it("should get the instructor's profile", async () => {
    const response = await request(app)
      .post("/api/instructor/profile")
      .send({
        token: instructorToken,
        _id:instructor._id
      }); 

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("instructor");
    expect(response.body.instructor).toHaveProperty("email", instructorMock.email);
    expect(response.body.instructor).toHaveProperty("name", instructorMock.name);
  });
});

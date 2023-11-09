const request = require("supertest");
const app = require("../../src/index"); // Replace with the actual path to your app's entry point
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");

describe("Instructor API - Profile On Load", () => {
  let instructor;
  let instructorToken;

  beforeAll(async () => {
    instructor = await Instructor.create(instructorMock);

    instructorToken = jwt.sign({ _id: instructor._id }, process.env.SECRET_KEY);

    await Instructor.updateOne(
      { _id: instructor._id },
      {
        $push: {
          tokens: { token: instructorToken },
        },
      }
    );
  });

  afterAll(async () => {
    await Instructor.findOneAndDelete({ email: instructorMock.email });
  });

  it("should load instructor profile", async () => {
    const response = await request(app)
      .get(`/api/instructor?id=${instructor._id}`)

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("name", instructorMock.name);
    expect(response.body).toHaveProperty("email", instructorMock.email);
    // Add other assertions for the properties you expect to be returned in the response
  });

  it("should return an error for an invalid instructor ID", async () => {
    const response = await request(app)
      .get("/api/instructor?id=invalid_id")
      .set("Authorization", `Bearer ${instructorToken}`);

    expect(response.status).toBe(400);
  });
});

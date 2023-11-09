const request = require("supertest");
const app = require("../../src/index"); // Replace with the actual path to your app's entry point
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");

describe("Instructor API - Token Verification", () => {
  let instructor;
  let instructorToken;

  beforeAll(async () => {
    instructor = await Instructor.create({...instructorMock,status:"registered"});

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

  it("should verify the instructor's token status", async () => {
    const response = await request(app)
      .post("/api/instructor/verify")
      .send({
        token: instructorToken, 
        _id:instructor._id
      })

    expect(response.status).toBe(200);
    expect(response.text).toBe("registered");
  });

  it("should return 'pending' for an instructor with pending status", async () => {
    // Create an instructor with 'pending' status
    const pendingInstructor = await Instructor.create({
      name: "Pending Instructor",
      email: "pending@example.com",
      password: "testPassword123!",
      status: "pending",
    });

    const pendingInstructorToken = jwt.sign(
      { _id: pendingInstructor._id },
      process.env.SECRET_KEY
    );

    await Instructor.updateOne(
      { _id: pendingInstructor._id },
      {
        $push: {
          tokens: { token: pendingInstructorToken },
        },
      }
    );

    const response = await request(app)
      .post("/api/instructor/verify")
      .send({
        token: pendingInstructorToken, 
        _id:pendingInstructor._id
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe("pending");

    await Instructor.findOneAndDelete({ email: "pending@example.com" });
  });
});

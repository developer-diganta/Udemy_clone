const request = require("supertest");
const app = require("../../src/index"); // Replace with the actual path to your app's entry point
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");

describe("Instructor API - Update Profile", () => {
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

  it("should update the instructor's profile", async () => {
    const updates = {
      name: "Updated Name",
      bio: "Updated Bio",
    };

    const response = await request(app)
      .patch("/api/instructor/profile/update")
      .send({ updates,token:instructorToken,_id:instructor._id });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", updates.name);
    expect(response.body).toHaveProperty("bio", updates.bio);
  });
});

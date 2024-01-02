const request = require("supertest");
const app = require("../../src/index"); // Replace with the actual path to your app's entry point
const Instructor = require("../../src/models/instructor");
const instructorMock = require("../utils/instructorMock");
const adminMockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVkZW15Y2xvbmVhZG1pbiIsImlhdCI6MTY5OTA3NTE2NH0.fYyBXcBEXQzb4c5EFSNM64JoFhKbZj-B3skFQX_zc3Y";
describe("Get Instructor Name API", () => {
  let instructor;

  beforeAll(async () => {
    instructor = await Instructor.create(instructorMock);
  });

  afterAll(async () => {
    await Instructor.deleteMany({});
  });

  it("should return the name of an instructor by their ID", async () => {
    const response = await request(app).post(`/api/admin/instructorname/${instructor._id}`).send({
        token:adminMockToken
    });

    expect(response.status).toBe(201);
    expect(response.text).toBe(instructor.name);
  });

  it("should return an error for an invalid instructor ID", async () => {
    const response = await request(app).post("/api/admin/instructorname/invalid_id").send({
        token:adminMockToken
    });

    expect(response.status).toBe(400);
  });
});

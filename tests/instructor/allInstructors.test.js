const request = require("supertest");
const app = require("../../src/index");
const jwt = require("jsonwebtoken");
const instructorMock = require("../utils/instructorMock");
const Instructor = require("../../src/models/instructor");
const adminMockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVkZW15Y2xvbmVhZG1pbiIsImlhdCI6MTY5OTA3NTE2NH0.fYyBXcBEXQzb4c5EFSNM64JoFhKbZj-B3skFQX_zc3Y";

describe("get all instructors", () => {
    beforeAll(async () => {
      await Instructor.create(instructorMock);
    });
    afterAll(async () => {
      await Instructor.findOneAndDelete({ email: "test@test.com" });
    });
    it("should fetch all instructors", async () => {
        const response = await request(app)
          .post("/api/admin/instructors")
          .send({ token: adminMockToken });
        expect(response.statusCode).toBe(200);
        
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    
        const instructor = response.body[0];
        expect(instructor).toHaveProperty("email", instructorMock.email);
        expect(instructor).toHaveProperty("name", instructorMock.name);
        expect(instructor).toHaveProperty("bio", instructorMock.bio);
        expect(instructor).toHaveProperty("status", "pending");
    
        expect(instructor).toHaveProperty("__v");
        expect(instructor).toHaveProperty("_id");
        expect(instructor).toHaveProperty("socialLinks");
        expect(instructor).toHaveProperty("createdAt");
        expect(instructor).toHaveProperty("status");
        expect(instructor).toHaveProperty("profileImage");
      });
})
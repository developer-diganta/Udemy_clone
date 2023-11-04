const request = require("supertest");
const app = require("../src/index");
const Student = require("../src/models/student");
const jwt = require("jsonwebtoken");
const studentmock = require("./utils/studentMock");
console.log(studentmock.name)
const adminMockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InVkZW15Y2xvbmVhZG1pbiIsImlhdCI6MTY5OTA3NTE2NH0.fYyBXcBEXQzb4c5EFSNM64JoFhKbZj-B3skFQX_zc3Y";

describe("get all students", () => {
    beforeAll(async () => {
      await Student.create(studentmock);
    });
    afterAll(async () => {
      await Student.findOneAndDelete({ email: "test@test.com" });
    });
    it("should fetch all students", async () => {
        const response = await request(app)
          .post("/api/admin/students")
          .send({ token: adminMockToken });
        expect(response.statusCode).toBe(200);
        
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    
        const student = response.body[0];
        expect(student).toHaveProperty("email", studentmock.email);
        expect(student).toHaveProperty("name", studentmock.name);
    
        expect(student).toHaveProperty("__v");
        expect(student).toHaveProperty("_id");
        expect(student).toHaveProperty("completed");
        expect(student).toHaveProperty("createdAt");
        expect(student).toHaveProperty("enrolled");
        expect(student).toHaveProperty("status");
        expect(student).toHaveProperty("tokens");
        expect(student).toHaveProperty("wishlist");
      });
})
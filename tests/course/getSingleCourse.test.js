const request = require("supertest");
const app = require("../../src/index"); 
const Course = require("../../src/models/course");
const mockInstructorId = require("../utils/mockInstructorId");

describe("Course API - Get Single Course", () => {
let course;
beforeAll(async () => {
    course = await Course.create({
        title: "Test Course",
        description: "This is a test course.",
        price: 100.0,
        discount: 10,
        instructor: mockInstructorId,
        stripePriceId: "12345",
        stripeProductId: "12345",
      });
})
afterAll(async () => {

    await Course.findOneAndDelete({ _id: course._id });
  });
  
  it("should retrieve a single course by ID", async () => {
    const courseId = course._id; // Replace with a valid course ID
    const response = await request(app).get(`/api/course/${courseId}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("course");
  });

  it("should return an error for an invalid course ID", async () => {
    const courseId = "65460a98cad7602c4aa6fc42";
    const response = await request(app).get(`/api/course/${courseId}`);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({"course": null});
  });
});

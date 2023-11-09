const request = require("supertest");
const app = require("../../src/index");
const Course = require("../../src/models/course");
const mockInstructorId = require("../utils/mockInstructorId");
const Instructor = require("../../src/models/instructor");
const instructorMock = require("../utils/instructorMock");

describe("Course API - Get Courses", () => {
  let courses;
    let instructor;
  beforeAll(async () => {
    instructor = await Instructor.create(instructorMock);

    courses = [
      {
        title: "Course 1",
        description: "Description for Course 1",
        rating: 4.5,
        enrollments: 100,
        thumbnail: "thumbnail_url_1",
        instructor: instructor._id,
        status: "active",
        stripePriceId: "12345",
        stripeProductId: "12345",
      },
      {
        title: "Course 2",
        description: "Description for Course 2",
        rating: 4.0,
        enrollments: 75,
        thumbnail: "thumbnail_url_2",
        instructor: instructor._id,
        status: "active",
        stripePriceId: "12346",
        stripeProductId: "12346",
      },
    ];

    await Course.create(courses);
  });

  afterAll(async () => {
    await Instructor.findOneAndDelete({ _id: instructor._id });

    await Course.deleteMany({ title: { $in: ["Course 1", "Course 2"] } });
  });

  it("should retrieve courses with sorting and limiting", async () => {
    const response = await request(app)
      .get("/api/courses")
      .query({ sortBy: "rating", sortOrder: -1, limit: 1 });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);

    const course = response.body[0];
    expect(course).toHaveProperty("title", "Course 1");
    expect(course).toHaveProperty("description", "Description for Course 1");
    expect(course).toHaveProperty("rating", 4.5);
  });
});

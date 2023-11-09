const request = require("supertest");
const app = require("../../src/index"); // Replace with the actual path to your app's entry point
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");
const Course = require("../../src/models/course");

describe("Course API - Publish Course", () => {
  let course;
  let instructor;
  let instructorToken;

  beforeAll(async () => {
    instructor = await Instructor.create(instructorMock);

    instructorToken = jwt.sign({ _id: instructor._id }, process.env.SECRET_KEY);

    course = await Course.create({
      title: "Test Course",
      description: "This is a test course.",
      price: 100.0,
      discount: 10,
      instructor: instructor._id,
      stripePriceId: "12345",
      stripeProductId: "12345",
      lessons: [
        {
          title: "Lesson 1",
          videos: [
            {
              title: "Video 1",
              videoLink: "link1",
            },
            {
              title: "Video 2",
              videoLink: "link2",
            },
          ],
        },
        {
          title: "Lesson 2",
          videos: [
            {
              title: "Video 3",
              videoLink: "link3",
            },
          ],
        },
      ],
    });


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
    await Course.findOneAndDelete({ _id: course._id });
  });

  it("should publish a course for review", async () => {
    const response = await request(app)
      .patch("/api/instructor/status")
      .send({
        courseId: course._id,
        instructorId: instructor._id,
        token: instructorToken,
      });

    expect(response.status).toBe(201);
    expect(response.text).toBe("Course Published for Review");
    
    const updatedCourse = await Course.findById(course._id);
    expect(updatedCourse.status).toBe("published");
  });
});

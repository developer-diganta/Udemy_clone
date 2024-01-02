const request = require("supertest");
const app = require("../../src/index"); // Replace with the actual path to your app's entry point
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");
const Course = require("../../src/models/course");

describe("Instructor API - Section Deletion", () => {
  let instructor;
  let instructorToken;
  let course;

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

  it("should delete a section from a course", async () => {
    const sectionId = 0; // Index of the section to be deleted

    const response = await request(app)
      .delete("/api/instructor/section/delete")
      .send({
        courseId: course._id,
        sectionId: sectionId,
        token: instructorToken, 
        _id:instructor._id
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Section Deleted");

    const updatedCourse = await Course.findById(course._id);
    expect(updatedCourse.lessons.length).toBe(course.lessons.length - 1);
  });

  it("should return an error for an invalid course ID", async () => {
    const sectionId = 0;

    const response = await request(app)
      .delete("/api/instructor/section/delete")
      .send({
        courseId: "65460a98cad7602c4aa6fc4f", // Invalid course ID
        sectionId: sectionId,
        token: instructorToken, 
        _id:instructor._id
      });

    expect(response.status).toBe(400);
  });
});

const request = require("supertest");
const app = require("../../src/index");
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");
const Course = require("../../src/models/course");

describe("Course API - Edit Course", () => {
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

  it("should edit a course", async () => {
    const courseId = course._id;
    const updates = {
      title: "Updated Course Title",
      description: "Updated course description.",
      price: 90.0,
      discount: 15,
      courseMaterials: [{name:"Updated course materials."}],
    };

    const response = await request(app)
      .patch("/api/instructor/editcourse")
      .send({
        courseId: courseId,
        updates: updates,
        email: instructorMock.email,
        token: instructorToken,
      });
      expect(response.status).toBe(200);
      const updatedCourse = await Course.findById(courseId);
    expect(updatedCourse.title).toBe(updates.title);
    expect(updatedCourse.description).toBe(updates.description);
    expect(updatedCourse.price).toBe(updates.price);
    expect(updatedCourse.discount).toBe(updates.discount);
    expect(updatedCourse.courseMaterials[0].name).toBe(updates.courseMaterials[0].name);
  });

  it("should return an error for an invalid course ID", async () => {
    const updates = {
      title: "Updated Course Title",
      description: "Updated course description.",
      price: 90.0,
      discount: 15,
      courseMaterials: "Updated course materials.",
    };

    const response = await request(app)
      .patch("/api/instructor/editcourse")
      .send({
        courseId: "65279382e113bf4157d4df2f",
        updates: updates,
        email: instructorMock.email,
        token: instructorToken,
      });

    expect(response.status).toBe(400);
  });
});

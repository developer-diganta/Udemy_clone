const request = require("supertest");
const app = require("../../src/index"); // Replace with the actual path to your app's entry point
const Instructor = require("../../src/models/instructor");
 // Import the Instructor model
const Course = require("../../src/models/course"); 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwt = require("jsonwebtoken");
const instructorMock = require("../utils/instructorMock");

describe("Instructor API - Course Addition", () => {
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

  it("should add a course to an instructor", async () => {
    const courseData = {
      title: "Test Course",
      description: "This is a test course.",
      price: 100.0,
      discount: 10,
    };

    const response = await request(app)
      .post("/api/instructor/course/add")
      .send({
        _id: instructor._id,
        email: instructor.email,
        token: instructorToken,
        course: courseData,
      });

    expect(response.status).toBe(201); 
    expect(response.body).toHaveProperty("message", "Course Added");
    expect(response.body).toHaveProperty("_id");
    const createdCourse = await Course.findOne({ _id: response.body._id });
    expect(createdCourse).not.toBeNull(); 
    expect(createdCourse.title).toBe(courseData.title);
    expect(createdCourse.description).toBe(courseData.description);
    expect(createdCourse.price).toBe(courseData.price);
    expect(createdCourse.discount).toBe(courseData.discount); 
  });
});

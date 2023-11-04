const request = require("supertest");
const app = require("../../src/index"); 
const Instructor = require("../../src/models/instructor");
const Course = require("../../src/models/course"); 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwt = require("jsonwebtoken");
const instructorMock = require("../utils/instructorMock");

describe("Instructor API - Course Addition", () => {
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
        stripePriceId:"12345",
        stripeProductId:"12345"
      });


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
    await Course.findOneAndDelete({ _id: course._id });
  });

  it("should fetch a single course for an instructor", async () => {
    const response = await request(app)
      .post("/api/instructor/course/viewone")
      .send({
        email: instructorMock.email,
        token: instructorToken,
        courseId: course._id,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("course");
    expect(response.body.course._id).toBe(course._id.toString());
    expect(response.body.course.title).toBe(course.title);
    expect(response.body.course.description).toBe(course.description);
    expect(response.body.course.price).toBe(course.price);
    expect(response.body.course.discount).toBe(course.discount);
  });

  it("should return an error for an invalid course ID", async () => {
    const response = await request(app)
      .post("/api/instructor/course/viewone")
      .send({
        email: instructorMock.email,
        token: instructorToken,
        courseId: "65279382e113bf4157d4df2f",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "No Course Found");
  });
});

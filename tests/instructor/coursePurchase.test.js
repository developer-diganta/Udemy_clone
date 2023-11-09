const request = require("supertest");
const app = require("../../src/index"); 
const Instructor = require("../../src/models/instructor");
const Course = require("../../src/models/course");
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
const Payment = require("../../src/models/payment");
describe("Course API - Course Purchases", () => {
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

      await Payment.create({
        student:instructor._id,
        course:course._id,
        paymentDetails:{
            checkoutSession:"pi_3O6v63SDxAGilksA1YMdeOeR",
            price:course.price
        }
      })
    });
  
    afterAll(async () => {
      await Instructor.findOneAndDelete({ email: instructorMock.email });
  
      await Course.findOneAndDelete({ _id: course._id });
    });
  it("should retrieve course purchases", async () => {
    const courseId = course._id; 
    const response = await request(app)
      .post("/api/instructor/course/purchases")
      .send({ courseId: courseId, token:instructorToken, _id:instructor._id });

    expect(response.status).toBe(201);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return an error for an invalid course ID", async () => {
    const courseId = "invalid_id";
    const response = await request(app)
      .post("/api/instructor/course/purchases")
      .send({ courseId: courseId });

    expect(response.status).toBe(401);
  });
});

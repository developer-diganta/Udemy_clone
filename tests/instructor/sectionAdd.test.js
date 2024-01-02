const request = require("supertest");
const app = require("../../src/index"); // Replace with the actual path to your app's entry point
const Course = require("../../src/models/course");
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");

describe("Course API - Section Add", () => {
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
      instructor: instructor._id,
      lessons: [
        {
          title: "Lesson 1",
          videos: [
            {
              title: "Video 1",
              videoLink: "link1",
            },
          ],
        },
        {
          title: "Lesson 2",
          videos: [
            {
              title: "Video 2",
              videoLink: "link2",
            },
          ],
        },
      ],
      stripePriceId:"12345",
      stripeProductId:"12345",
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

  it("should add a new section to the course", async () => {
    const sectionTitle = "New Section";
    const sectionIndex = 2; 

    const response = await request(app)
      .post("/api/instructor/course/lesson/section/add")
      .send({
        id: course._id,
        index: sectionIndex,
        title: sectionTitle,
        token: instructorToken,
      });
      console.log(response.body)
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("lessons");
    expect(Array.isArray(response.body.lessons)).toBe(true);
    expect(response.body.lessons.length).toBe(3); 

    const newSection = response.body.lessons[2];
    expect(newSection).toHaveProperty("title", sectionTitle);
    expect(newSection).toHaveProperty("videos");
    expect(Array.isArray(newSection.videos)).toBe(true);
    expect(newSection.videos.length).toBe(0); 
  });
});

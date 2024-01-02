const request = require("supertest");
const app = require("../../src/index");
const Course = require("../../src/models/course");
const instructorId = require("../utils/mockInstructorId");
const Instructor = require("../../src/models/instructor");
const instructorMock = require("../utils/instructorMock");
const jwt = require("jsonwebtoken");
describe("Course API - Delete Video", () => {
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
        stripePriceId:"12345",
        stripeProductId:"12345",
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
            tokens: { token: instructorToken }
          }
        }
      );
  });

  afterAll(async () => {
    await Instructor.findOneAndDelete({ email: instructorMock.email });

    await Course.findOneAndDelete({ _id: course._id });
  });

  it("should delete a video from a lesson", async () => {
    const lessonIndex = 0;
    const videoIndex = 1; 
    const subsectionToBeUpdated = 0;

    const response = await request(app)
      .post("/api/instructor/videos/delete")
      .send({
        courseId: course._id,
        indexOfVideo: videoIndex,
        subsectionToBeUpdated,
        email: instructorMock.email,
        token: instructorToken,
      });
      console.log("12341124125",course._id)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("deletedVideo");
    const deletedVideo = response.body.deletedVideo;
    expect(deletedVideo[0]).toHaveProperty("title", "Video 2");
    expect(deletedVideo[0]).toHaveProperty("videoLink", "link2");
    expect(deletedVideo[0]).toHaveProperty("_id");
    
    const updatedCourse = await Course.findById(course._id);
    expect(updatedCourse.lessons[lessonIndex].videos.length).toBe(1);
    expect(updatedCourse.lessons[lessonIndex].videos[0].title).toBe("Video 1");
  });

  it("should return an error for an invalid course ID", async () => {
    const response = await request(app)
      .post("/api/instructor/videos/delete")
      .send({
        courseId: "65460a98cad7602c4aa6fc4f",
        indexOfVideo: 0,
        subsectionToBeUpdated: 0,
        email: instructorMock.email,
        token: instructorToken,
      });

    expect(response.status).toBe(400); 
  });
});

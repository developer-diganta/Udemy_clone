const request = require('supertest');
const app = require('../../src/index');
const jwt = require('jsonwebtoken');
const instructorMock = require('../utils/instructorMock');
const Instructor = require('../../src/models/instructor');
const Course = require('../../src/models/course');

describe('Video Upload API', () => {
  let instructorToken;
  let course;

  beforeAll(async () => {
    const instructor = await Instructor.create(instructorMock);

    instructorToken = jwt.sign({ _id: instructor._id }, process.env.SECRET_KEY);

    course = await Course.create({
      title: 'Sample Course',
      description: 'A sample course',
      instructor: instructor._id,        stripePriceId: "12346",
      stripeProductId: "12346",
      lessons: [
        {
          title: 'Lesson 1',
          videos: [
            {
              title: 'Video 1',
              videoLink: 'link1',
            },
          ],
        },
        {
          title: 'Lesson 2',
          videos: [
            {
              title: 'Video 2',
              videoLink: 'link2',
            },
          ],
        },
      ],
    });
  });

  afterAll(async () => {
    await Instructor.findOneAndDelete({ email: instructorMock.email });
    await Course.deleteMany({});
  });

  it('should upload a video to a lesson', async () => {
    const videoTitle = 'New Video';
    const videoToAddAfter = 0;
    const subsectionToBeUpdated = 1;
    const courseId = course._id;
    console.log(course._id)
    const response = await request(app)
      .post('/api/courses/uploads')
      .send({
        title: videoTitle,
        videoToAddAfter,
        subsectionToBeUpdated,
        courseId,
        fileName: 'new-video-file.mp4',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('File uploaded and saved successfully');

    const updatedCourse = await Course.findById(courseId);
    const updatedLesson = updatedCourse.lessons[subsectionToBeUpdated];
    expect(updatedLesson.videos.length).toBe(2);
    expect(updatedLesson.videos[1].title).toBe(videoTitle); 
  });

  it('should return an error for an invalid course ID', async () => {
    const videoTitle = 'New Video';
    const videoToAddAfter = 0; 
    const subsectionToBeUpdated = 1;
    const courseId = '6527e393709093928206a462';

    const response = await request(app)
      .post('/api/courses/uploads')
      .send({
        title: videoTitle,
        videoToAddAfter,
        subsectionToBeUpdated,
        courseId,
        fileName: 'new-video-file.mp4', 
      });

    expect(response.status).toBe(500); 
    expect(response.body.message).toBe('Error uploading file');
  });
});

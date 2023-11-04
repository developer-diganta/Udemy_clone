const courseMock = {
    title: "Sample Course",
    description: "This is a sample course description.",
    instructor: "your_instructor_id", // Replace with a valid instructor ObjectId
    stripePriceId: "your_stripe_price_id",
    stripeProductId: "your_stripe_product_id",
    categories: ["Category1", "Category2"],
    price: 49.99,
    discount: 20,
    rating: 4.5,
    reviews: [
      {
        rating: 5,
        review: "Great course!",
        reviewer: "your_student_id", // Replace with a valid student ObjectId
      },
    ],
    enrollments: 100,
    thumbnail: "https://example.com/thumbnail.png",
    requirements: ["Requirement 1", "Requirement 2"],
    courseMaterials: [
      {
        name: "Material 1",
      },
      {
        name: "Material 2",
      },
    ],
    questionAnswers: [
      {
        title: "Question 1",
        description: "Description for Question 1",
        askedBy: "your_student_id", // Replace with a valid student ObjectId
        answers: [
          {
            answerer: "your_instructor_id", // Replace with a valid instructor ObjectId
            userType: "Instructor",
            answer: "Answer to Question 1",
          },
          {
            answerer: "your_student_id", // Replace with a valid student ObjectId
            userType: "Student",
            answer: "Another answer to Question 1",
          },
        ],
      },
    ],
    lessons: [
      {
        title: "Lesson 1",
        videos: [
          {
            title: "Video 1",
            videoLink: "https://example.com/video1.mp4",
          },
          {
            title: "Video 2",
            videoLink: "https://example.com/video2.mp4",
          },
        ],
      },
      {
        title: "Lesson 2",
        videos: [
          {
            title: "Video 3",
            videoLink: "https://example.com/video3.mp4",
          },
        ],
      },
    ],
    createdAt: new Date("2023-11-04T05:28:24.348Z"),
    updatedAt: new Date("2023-11-04T05:28:24.348Z"),
    status: "published",
  };
  
  module.exports = courseMock;
  
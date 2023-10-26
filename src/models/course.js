/*
*****SCHEMA FOR COURSE*****

title: Title of the course, between 4 to 50 characters

description: Description of the course, within 500 characters

instructor: Mapping to instructor from Instructor Collection, object id

categories: Array of strings (categories)

price: Price of course, upto 2 decimal places

discount: Discount as %age between 0 to 100

rating: between 0 to 5

enrollments: total number of enrollments for the course

thumbnail: thumbnail of the course, with default thumbnail

requirements: Array of string of requirements for the course

courseMaterials: Array of Objects with name (mischellaneous)

questionAnswers: QAs for a particular course, can be answered by student or teacher

lessons: The lesson array of objects. Each object acts as sub lesson which contains array of videos.

createdAt: Time Of Course Creation

updatedAt: Time of Course Updation

*/

const validator = require("validator");
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 4,
    maxlength: 50,
    validate: {
      validator: (value) => validator.isAlphanumeric(value.replace(/\s/g, "")),
      message: "Invalid characters in title",
    },
  },

  description: {
    type: String,
    default: "",
    maxLength: 500,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
  },
  stripePriceId: {
    type: String,
    required: true,
  },
  stripeProductId: {
    type: String,
    required: true,
  },
  categories: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    // validate: {
    //   validator: (categories) =>
    //     categories.every((cat) =>
    //       validator.isAlphanumeric(cat.replace(/\s/g, "")),
    //     ),
    //   message: "Each category should be alphanumeric",
    // },
  },

  price: {
    type: Number,
    validate: {
      validator: (value) => {
        if (isNaN(value)) return false;

        const decimalPlaces = (value.toString().split(".")[1] || "").length;
        return decimalPlaces <= 2;
      },
      message: "Price should be a number with at most 2 decimal places",
    },
  },

  discount: {
    type: Number,
    min: 10,
    max: 100,
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
  },

  reviews: [
    {
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
      review: {
        type: String,
      },
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "Student",
      },
    },
  ],

  enrollments: {
    type: Number,
    default: 0,
  },

  thumbnail: {
    type: String,
    default:
      "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/42602/play-button-emoji-clipart-md.png",
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Invalid URL for thumbnail image.",
    },
  },

  requirements: {
    type: [
      {
        type: String,
        minlength: 10,
        maxlength: 100,
        default: "None",
      },
    ],
  },

  courseMaterials: {
    type: [
      {
        name: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  questionAnswers: {
    type: [
      {
        title: {
          type: String,
          minlength: 10,
          maxlength: 100,
        },
        description: {
          type: String,
          minlength: 50,
          maxlength: 1000,
        },
        askedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        askedOn: {
          type: Date,
          default: Date.now,
        },
        answers: {
          type: [
            {
              answerer: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: "answers.userType",
              },
              userType: {
                type: String,
                enum: ["Student", "Instructor"],
              },
              answer: {
                type: String,
              },
              answeredOn: {
                type: Date,
                default: Date.now,
              },
            },
          ],
        },
      },
    ],
  },

  lessons: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        videos: [
          {
            title: {
              type: String,
              required: true,
            },
            videoLink: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
  },

  status: {
    type: String,
    enum: ["pending", "published"],
    default: "pending",
  },
});

// async function fuzzySearch(query) {
//   // Case-insensitive search using a regular expression
//   const result = await Course.find({ title: { $regex: new RegExp(query, 'i') } });
//   console.log(result)
//   return result;
// }

// courseSchema.statics.findCourse = async function (_id){
//   const
// }

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;

/*
*****SCHEMA FOR STUDENT*****
    name - Between 4 to 25 characters, alphanumeric with spaces

    email: Normal Email

    password: At least 8 characters with at least one uppercase, one lowercase, one digit, and one special character

    enrolled: Array of objects, each object has course id, enrollment date and current progress

    wishlist: Array of ids of course

    completed: Array of objects, consiting of course id and completed date
*/

const mongoose = require("mongoose");
const validator = require("validator");
const salts = require("../config/salts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    maxlength: 25,
    validate: {
      validator: (value) => validator.isAlpha(value.replace(/\s/g, "")),
      message: "Invalid characters in name",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid Email",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return (
          validator.isLength(value, { min: 8 }) &&
          /[A-Z]/.test(value) &&
          /[a-z]/.test(value) &&
          /\d/.test(value) &&
          /[\W_]/.test(value)
        );
      },
      message:
        "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    },
  },

  enrolled: {
    type: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        progress: [
          {
            section:{
              type:Number
            },
            videoNumber:{
              type:Number
            }
          }
        ],
        enrolledDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  wishlist: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },

  completed: {
    type: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        completedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  status: {
    type: String,
    enum: ["registered", "pending"],
    default: "pending",
  },
  createdAt:{
    type:Date,
    default: Date.now
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

/*
  Password Hasher for instructor schema. fires on every save operation, checking if password is modified.
*/

studentSchema.pre("save", async function (next) {
  const student = this;
  if (this.isModified("password")) {
    student.password = await bcrypt.hash(student.password, salts);
  }
  next();
});

/*Auth token generator based on object id */

studentSchema.methods.generateAuthToken = async function (ip) {
  const student = this;
  const token = jwt.sign(
    {
      _id: student._id.toString(),
    },
    process.env.SECRET_KEY,
  );

  student.tokens = student.tokens.concat({ token });
  await student.save();

  return token;
};

/*
  student finder via email and password, also allows at max 3 sessions per email
*/

studentSchema.statics.findByCredentials = async (email, password) => {
  const student = await Student.findOne({ email });

  if (!student) {
    throw new Error("Unable to login");
  }

  if (student.tokens.length > 2) {
    throw new Error("Login Overflow");
  }

  const isMatch = await bcrypt.compare(password, student.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return student;
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

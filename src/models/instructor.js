/*
*****SCHEMA FOR INSTRUCTOR*****
Every Instructor consists of the following properties:
  name - Between 4 to 25 characters, alphanumeric with spaces

  email: Normal Email

  password: At least 8 characters with at least one uppercase, one lowercase, one digit, and one special character

  bio: Not mandatory, between 10 to 500 characters

  profileImage: profile image with a given default value

  socialLinks: Array consisting of names and links :-> {
    name:link
  }

  createdAt: Timestamp of account creation

*/

const mongoose = require("mongoose");
const validator = require("validator");
const salts = require("../config/salts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const instructorSchema = new mongoose.Schema({
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
  bio: {
    type: String,
    default: "",
    maxLength: 500,
  },
  profileImage: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQINHBtBZ5RQtpGgsdGGOZj_-s21S4jSIaPow&usqp=CAU",
  },
  status: {
    type: String,
    enum: ["registered", "pending"],
    default: "pending",
  },
  socialLinks: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        link: {
          type: String,
          required: true,
          validate: {
            validator: validator.isURL,
            message: "Invalid URL for social link.",
          },
        },
      },
    ],
    validate: {
      validator: (links) =>
        links.every(
          (link) => link.name && link.link && validator.isURL(link.link),
        ),
      message: "Each social link must have a valid name and link.",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
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

instructorSchema.pre("save", async function (next) {
  const instructor = this;
  if (this.isModified("password")) {
    instructor.password = await bcrypt.hash(instructor.password, salts);
  }
  next();
});

/*Auth token generator based on object id */

instructorSchema.methods.generateAuthToken = async function () {
  const instructor = this;
  const token = jwt.sign(
    {
      _id: instructor._id.toString(),
    },
    process.env.SECRET_KEY,
  );
  instructor.tokens = instructor.tokens.concat({ token });
  await instructor.save();

  return token;
};

/* Auth token verification */
instructorSchema.statics.verifyAuthToken = async function (token, email) {
  const Instructor = this;
  console.log(email);
  let decoded;
  console.log(token);
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
  } catch (error) {
    // Token verification failed
    throw new Error("Invalid token");
  }

  const instructor = await Instructor.findOne({
    _id: decoded._id,
    email: email,
    "tokens.token": token,
  });
  if (!instructor) {
    // Token is valid, but the associated user not found
    throw new Error("Instructor not found");
  }

  return instructor;
};

/*
  instructor finder via email and password, also allows at max 3 sessions per email
*/

instructorSchema.statics.findByCredentials = async (email, password) => {
  const instructor = await Instructor.findOne({ email });

  if (!instructor) {
    throw new Error("User does not exist");
  }

  // if (instructor.tokens.length > 2) {
  //   throw new Error("Login Overflow");
  // }


  const isMatch = await bcrypt.compare(password, instructor.password);

  if (!isMatch) {
    throw new Error("Credentials Mismatch");
  }

  return instructor;
};

instructorSchema.statics.validateAndGetInstructor = async (_id, email) => {
  const instructor = await Instructor.findOne({ _id, email });

  if (!instructor) {
    throw new Error("No User Found");
  }

  return instructor;
};

const Instructor = mongoose.model("Instructor", instructorSchema);

module.exports = Instructor;

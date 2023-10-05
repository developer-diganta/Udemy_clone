/*
*****SCHEMA FOR INSTRUCTOR*****
Every Instructor consists of the following properties:
  name - Between 4 to 25 characters, alphanumeric with spaces

  email: Normal Email

  password: At least 8 characters with at least one uppercase, one lowercase,
one digit, and one special character

  bio: Not mandatory, between 10 to 500 characters

  profileImage: profile image with a given default value

  socialLinks: Array consisting of names and links :-> {
    name:link
  }

  createdAt: Timestamp of account creation

*/

const validator = require("validator");

const Instructor = {
  name : {
    type : String,
    required : true,
    trim : true,
    minlength : 4,
    maxlength : 25,
    validate : {
      validator : (value) => validator.isAlpha(value.replace(/\s/g, "")),
      message : "Invalid characters in name",
    },
  },
  email : {
    type : String,
    required : true,
    validate : {
      validator : (value) => validator.isEmail(value),
      message : "Invalid Email",
    },
  },
  password : {
    type : String,
    required : true,
    validate : {
      validator : (value) => {
        return (validator.isLength(value, {min : 8}) && /[A-Z]/.test(value) &&
                /[a-z]/.test(value) && /\d/.test(value) && /[\W_]/.test(value));
      },
      message :
          "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    },
  },
  bio : {
    type : String,
    default : "",
    maxLength : 500,
  },
  profileImage : {
    type : String,
    default :
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQINHBtBZ5RQtpGgsdGGOZj_-s21S4jSIaPow&usqp=CAU",
    validate : {
      validator : (value) => validator.isURL(value),
      message : "Invalid URL for profile image.",
    },
  },
  socialLinks : {
    type : [
      {
        name : {
          type : String,
          required : true,
        },
        link : {
          type : String,
          required : true,
          validate : {
            validator : validator.isURL,
            message : "Invalid URL for social link.",
          },
        },
      },
    ],
    validate : {
      validator : (links) => links.every((link) => link.name && link.link &&
                                                   validator.isURL(link.link)),
      message : "Each social link must have a valid name and link.",
    },
  },
  createdAt : {
    type : Date,
    default : Date.now,
  },
};

export default Instructor;

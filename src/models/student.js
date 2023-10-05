/*
*****SCHEMA FOR STUDENT*****
    name - Between 4 to 25 characters, alphanumeric with spaces

    email: Normal Email

    password: At least 8 characters with at least one uppercase, one lowercase,
one digit, and one special character

    enrolled: Array of objects, each object has course id, enrollment date and
current progress

    wishlist: Array of ids of course

    completed: Array of objects, consiting of course id and completed date
*/

const validator = require("validator");

const Student = {
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

  enrolled : {
    type : [
      {
        id : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Course',
        },
        progress : {
          completed : {
            type : Number,
          },
        },
        enrolledDate : {
          type : Date,
          default : Date.now,
        },
      },
    ],
  },

  wishlist : {
    type : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course',
      },
    ],
  },

  completed : {
    type : [
      {
        courseId : {
          type : mongoose.Schema.Types.ObjectId,
          ref : 'Course',
        },
        completedDate : {
          type : Date,
          default : Date.now,
        },
      },
    ],
  },
};

export default Student;
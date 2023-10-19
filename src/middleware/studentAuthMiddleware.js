const jwt = require("jsonwebtoken");
const Student = require("../../src/models/student");

const studentAuthMiddleware = async (req, res, next) => {
  try {
    console.log(req.body);
    const token = req.body.token;
    // const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("123");
    console.log(decoded._id);
    const student = await Student.findOne(
      {
        _id: decoded._id,
        "tokens.token": token,
      },
      {
        password: 0,
        tokens: 0,
      },
    );

    if (!student) {
      throw new Error();
    }

    req.student = student; // Attach the student to the request
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = studentAuthMiddleware;

const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");

const authMiddleware = async (req, res, next) => {
  try {
    // console.log(req.body);
    const token = req.body.token;

    // const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("123");
    // console.log(decoded._id);
    const instructor = await Instructor.findOne(
      {
        _id: decoded._id,
        "tokens.token": token,
      },
      {
        password: 0,
        tokens: 0,
      },
    );

    if (!instructor) {
      throw new Error();
    }

    req.instructor = instructor; // Attach the instructor to the request
    req.token = token;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = authMiddleware;

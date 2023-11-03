const jwt = require("jsonwebtoken");
const Instructor = require("../../src/models/instructor");

const adminAuthMiddleware = async (req, res, next) => {
  try {
    console.log(req.body);
    const token = req.body.token;

    // const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log("123");
    // console.log(decoded._id);


    if (!decoded.username==="udemycloneadmin") {
      throw new Error();
    }

    // req.instructor = instructor; // Attach the instructor to the request
    req.token = token;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = adminAuthMiddleware;

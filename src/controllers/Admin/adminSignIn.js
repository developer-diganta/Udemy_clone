const jwt = require("jsonwebtoken");

const adminSignIn = async (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  if (userName === "udemycloneadmin" && password === "SomeRandomP@ssword1") {
    const token = jwt.sign(
      {
        userName,
      },
      process.env.SECRET_KEY,
    );
    res.status(201).send({
      auth: "Success",
      token,
      userName,
    });
    return;
  } else {
    console.log("INVALID");
    res.status(400).send({
      error: "Invalid Credentials",
    });
    return;
  }
};

module.exports = {
  adminSignIn,
};

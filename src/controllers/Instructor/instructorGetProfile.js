const instructorGetProfile = async (req, res) => {
  try {
    res.status(201).send({ instructor: req.instructor });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  instructorGetProfile,
};

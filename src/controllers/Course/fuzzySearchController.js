const Course = require("../../models/course");
const Fuse = require("fuse.js");

const fuzzySearchController = async (req, res) => {
  const allCourses = await Course.find({});

  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: true,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ["title"],
  };

  const fuse = new Fuse(allCourses, fuseOptions);

  const results = fuse.search(req.query.search);
  res.send(results);
  return;
};

module.exports = {
  fuzzySearchController,
};

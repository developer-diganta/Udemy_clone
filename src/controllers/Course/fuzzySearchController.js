const Course = require("../../models/course");
const Fuse = require("fuse.js");

const fuzzySearchController = async (req, res) => {
  const allCourses = await Course.find({"status":"active"});
  if(req.query.search==="") {
    let results = allCourses.map((x,i)=>{return {item:x,refIndex:i}})
    res.status(200).send(results);
    return;
  }

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

  let results = fuse.search(req.query.search);
  console.log(results)
  if(req.query.search==="") results = allCourses.map((x,i)=>{return {item:x,refIndex:i}})
  console.log(results)

  res.send(results);
  return;
};

module.exports = {
  fuzzySearchController,
};

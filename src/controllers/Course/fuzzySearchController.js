const Course = require("../../models/course");
const Fuse = require("fuse.js");
const logger = require("../../logger/logger")

const fuzzySearchController = async (req, res) => {
  const allCourses = await Course.find({"status":"active"});
  if(req.query.search==="") {
    let results = allCourses.map((x,i)=>{return {item:x,refIndex:i}})
    res.status(200).send(results);
    return;
  }
  console.log(req.query.type,"{}{}{}{}{}{}{}{}{}{}{}")
  if(req.query.type==="category"){
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLlll")
    const courses = await Course.find({"status":"active"}).populate({
      path: 'instructor',
      select: ["name"]
    });
  const result = [];
  const category = req.query.search;
  for(var i=0;i<courses.length;i++){
      if(courses[i].categories.includes(category)){
          result.push(courses[i]);
      }
  }
  let results = result.map((x,i)=>{return {item:x,refIndex:i}});
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

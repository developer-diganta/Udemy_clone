const axios = require("axios");
const Course = require("../../models/course");
const logger = require("../../logger/logger")

const codeRunner = async (req,res) => {
    try{
console.log(req.body)
const options = {
    method: 'POST',
    url: 'https://online-code-compiler.p.rapidapi.com/v1/',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'ce892b78cdmshcb95f7134ec1be4p13ee71jsnded91e48b430',
      'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
    },
    data: {
      language: req.body.language,
      version: 'latest',
      code: req.body.code,
      input: null
    }
  };
  console.log(req.body.language)
  console.log(req.query.courseId)
  const response = await axios.request(options);
  console.log(response.data.output)
  const course = await Course.findById(req.query.courseId)
  logger.logger.log("info","Code Runner")
  const output = course.lessons[req.query.section].videos[req.query.questionId].output+"\n"

  res.status(200).send({
    output:response.data.output,
    result:output===response.data.output
  });
  
    }catch(error){
        // console.log(error)
        res.status(500).send("Error Running Code")
    }
}

module.exports = {
    codeRunner
}
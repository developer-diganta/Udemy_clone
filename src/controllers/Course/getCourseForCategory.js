const Course = require("../../models/course")
const logger = require("../../logger/logger")

const getCourseForCategory = async (req,res) => {
    try{
        const courses = await Course.find().populate({
            path: 'instructor',
            select: ["name"]
          });
        const result = [];
        const category = req.query.category;
        console.log(category)
        for(var i=0;i<courses.length;i++){
            if(courses[i].categories.includes(category)){
                console.log("P")
                result.push(courses[i]);
            }
        }
        let results = result.map((x,i)=>{return {item:x,refIndex:i}});
        res.status(200).send(results);
    }catch(error){
        console.log(error) 
        res.status(500).send(error)
    }
}

module.exports = {
    getCourseForCategory
}
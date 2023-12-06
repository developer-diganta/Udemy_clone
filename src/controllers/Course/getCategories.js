const Course = require("../../models/course")
const logger = require("../../logger/logger")

const getCategories = async (req,res)=>{
    try{
        const courses = await Course.find();
        const categories = new Set();
        for(var i=0;i<courses.length;i++){
            const courseCategories = courses[i].categories;
            console.log(courseCategories)
            courseCategories.forEach(x=>categories.add(x));
        }
        res.status(200).send(Array.from(categories));
    }catch(error){
        console.log(error)
        res.status(500).send("Internal Error")
    }
}

module.exports = {
    getCategories
}
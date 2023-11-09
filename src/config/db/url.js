let url = 
process.env.ENV==="test"?"mongodb://127.0.0.1:27017/udemycloneproject":"mongodb://127.0.0.1:27017/udemycloneproject"
module.exports = url;

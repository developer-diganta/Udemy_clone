let url = 
process.env.ENV==="test"?"mongodb://127.0.0.1:27017/udemyclone":"mongodb://127.0.0.1:27017/udemyclonetest"
module.exports = url;

const mongoose = require("mongoose");
const url = require("./url");

mongoose.connect(url, {useNewUrlParser : true});

mongoose.connection.on("connected",
                       () => { console.log("Connected to the database"); });

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to the database:", err.message);
});

mongoose.connection.on(
    "disconnected", () => { console.log("Disconnected from the database"); });

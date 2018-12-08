let mongoose = require("mongoose");

const schema = new mongoose.Schema({
    task: {
        type: String
    },
    date: {
        type: String
    }
});

module.exports =  mongoose.model("Task", schema);
const mongoose = require("mongoose");

const DoneTaskSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    count: {
        type: String,
        required: true
    },
    userCheck: {
        type: String,
        required: true
    },
    userDone: {
        type: String,
        required: true
    },
    doneTime: {
        type: String,
    },
}, { timestamps: true });

const DoneTask = mongoose.model("DoneTask", DoneTaskSchema);

module.exports = DoneTask;
const mongoose = require("mongoose");

const DoneAllTaskSchema = new mongoose.Schema({
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

const DoneAllTask = mongoose.model("DoneAllTask", DoneAllTaskSchema);

module.exports = DoneAllTask;
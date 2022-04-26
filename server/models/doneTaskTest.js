const mongoose = require("mongoose");

const DoneTaskTestSchema = new mongoose.Schema({
    type: {
        type: String
    },
    system: {
        type: String
    },
    parameter: {
        type: String
    },
    priority: {
        type: String
    },
    total: {
        type: String
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
    createAt: {
        type: String
    },
    updateAt: {
        type: String
    }
});

const DoneTaskTest = mongoose.model("DoneTaskTest", DoneTaskTestSchema);

module.exports = DoneTaskTest;
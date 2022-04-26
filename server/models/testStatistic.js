const mongoose = require("mongoose");

const TestStatisticSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    system: {
        type: String,
        required: true,
    },
    parameter: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    usernameDone: {
        type: String
    },
    createAt: {
        type: String
    },
    updateAt: {
        type: String
    }
});

const TestStatistic = mongoose.model("TestStatistic", TestStatisticSchema);

module.exports = TestStatistic;
const mongoose = require("mongoose");

const StatisticSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    count: {
        type: String,
        required: true
    },
    firstTime: {
        type: String,
        required: true
    },
    finalTime: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Statistic = mongoose.model("Statistic", StatisticSchema);

module.exports = Statistic;
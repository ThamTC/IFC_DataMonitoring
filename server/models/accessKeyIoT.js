const mongoose = require("mongoose");

const AccessKeyIoTSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    accessKey: {
        type: String,
        required: true
    },
}, { timestamps: true });

const AccessKeyIoT = mongoose.model("AccessKeyIoT", AccessKeyIoTSchema);

module.exports = AccessKeyIoT;
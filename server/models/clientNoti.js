const mongoose = require("mongoose");

const ClientNotiSchema = new mongoose.Schema({
    clientId: {
        type: String,
        required: true,
        unique: true
    },
    endpoint: {
        type: String,
        required: true
    },
}, { timestamps: true });

const ClientNoti = mongoose.model("ClientNoti", ClientNotiSchema);

module.exports = ClientNoti;
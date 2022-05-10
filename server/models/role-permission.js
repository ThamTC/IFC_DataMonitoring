const mongoose = require("mongoose");

const RolePermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    permission: {
        type: Array,
        required: true
    }
}, { timestamps: true });

const RolePermission = mongoose.model("RolePermission", RolePermissionSchema);

module.exports = RolePermission;
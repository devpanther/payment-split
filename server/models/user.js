const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    shop: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    isOnline: {
        type: Boolean,
        required: true,
    },
    accessToken: {
        type: String,
        required: false,
    },
    scope: {
        type: String,
        required: false,
    },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
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
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
        required: true,
    },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required"]
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: [true, "email must be unique"]
    },
    password: {
        type: String,
        required: [true, "password"]
    }
},{
    timestamps: true
});


module.exports = mongoose.model("User", userModel);
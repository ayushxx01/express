const mongoose = require("mongoose");


const noteModel = new mongoose.Schema({
    uid:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    heading: {
        type: String,
        required: true
    },
    note: { 
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    }},{
        timestamps:true
    });


    module.exports = mongoose.model("Note",noteModel);
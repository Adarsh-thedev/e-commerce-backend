const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        maxlength : 32
    },

    lastname : {
        tyep : String,
        trim :  true,
        maxlength : 32
    },

    email : {
        tyep : String,
        trim :  true,
        required : true,
        unique : true
    },

    userinfo : {
        type : String,
        trim :  true
    },

    password : {
        type : String,
        trim :  true
    },

    salt : String,

    role : {
        type : Number,
        default : 0
    },

    purchases : {
        type : Array,
        default : []
    }
});

module.exports = mongoose.model("User", userSchema);
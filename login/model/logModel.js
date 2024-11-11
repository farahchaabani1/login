const mongoose = require("mongoose");

const LoginSchema = mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    mp: {
        type: String,
        required: true
    }

    
});

module.exports = mongoose.model("Login", LoginSchema);
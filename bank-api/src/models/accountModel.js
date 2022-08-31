const mongoose = require("mongoose");
const validator = require('validator');


const accountSchema =  new mongoose.Schema({
    holderName:{
        type:String,
        required: true,
        trim: true
    },

    accountNumber:{
        type: String,
        required: true,
        unique: true
    },
    balance:{
        type: Number,
        default: 5000
    }
})



const Account = mongoose.model('Account',accountSchema); 

module.exports = Account;
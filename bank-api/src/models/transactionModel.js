const mongoose = require("mongoose");
const validator = require('validator');

const createHash = require('hash-generator');
const hashLength = 6;


const transactionSchema =  new mongoose.Schema({
    trxID:{
        type: String,
        uppercase:true   
    },
    inID:{
        type:String,
        ref: "Account",
        require: true
    },
    outID:{
        type:String,
        ref:"Account",
        require: true
    },
    amount:{
        type: Number,
        require: true
    },
    date: {
        type: String,
        default: new Date().toString()
    }
    
})

 
transactionSchema.methods.generateTrx = async function(){
    const transaction = this;

    transaction.trxID = createHash(hashLength);
    await transaction.save();
}



const transactionList = mongoose.model('Transaction',transactionSchema); 
module.exports = transactionList;
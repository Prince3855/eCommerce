const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        email : {
            type: String,
            unique : true
        },
        phone : {
            type: String,
            required: true
        },
        address : {
            street : String,
            area : String,
            city : String,
            pincode : Number,
            country : String
        },
        password : String
    
    }, { timestamps: true },
);

module.exports = mongoose.model('Customer',customerSchema);
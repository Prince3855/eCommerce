const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productName : {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        createdBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Admin',
            required: true
        },
        images : [String],
        price : {
            type: Number,
            required: true
        },
        discount: Number,
        qty: Number,
        features : [String],
        categoryId : {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Category",
            required: true
        },
        details : {
            color: String,
            size : String,
            weight : String
        }
    }, { timestamps: true}
); 

module.exports = mongoose.model('Product', productSchema);
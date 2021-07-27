const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderedBy : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        orderStatus : {
            status : {
                type: String,
                enum: ["ordered", "packed", "shipped", "delivered"],
                default: "ordered"
            },
            date: {
                type: Date,
                default: new Date()
            },
            isCompleted: {
                type: Boolean,
                default: false,
            }
        },
        payment: {
            status:{
                type: String,
                enum: ["pending", "completed", "cancelled", "refund"],
                required: true,
                default: "pending"
            },
            transactionId: {
                type: String,
                default: ""
            }
        },
        shippingAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        items : [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                payablePrice: {
                    type: Number,
                    required: true
                },
                purchasedQty: {
                    type: Number,
                    required: true
                },
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
        }

    }, {timestamps: true}
);

module.exports = mongoose.model('Order', orderSchema);
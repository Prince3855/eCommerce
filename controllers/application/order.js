const Order = require('../../models/order');

module.exports = {

    // Get all orders
    getOrders : async (req,res) => {
        try{
            let orders = [];
            orders = await Order.find({ orderedBy : req.customerId })
                    .populate({
                        path: 'items.productId',
                        select: "images productName description price"
                    })
                    .populate({
                        path: 'shippingAddress',
                        select: "address"
                    });
            return res.status(200).json({ status: "ok", data: orders });
        } catch(err) {
            console.log(err);
            return res.status(400).json({ status: "error", message: err.message });
        }
    },

    // Create new order
    createNewOrder : async (req,res) => {
        let order = {
            ...req.body,
            orderedBy : req.customerId,
            shippingAddress : req.customerId,
        }
        try{
            await Order.create(order);
            return res.status(201).json({ status: "ok", message: "Order created successfully!" });
        } catch(err) {
            console.log(err);
            return res.status(400).json({ status: "error", message: err.message });
        }
    }

}
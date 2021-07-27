const Product = require('../../models/product');

module.exports = {

    // Get all products
    getProducts : async (req,res) => {
        try{
            let products = [];
            products = await Product.find({})
                    .populate({ path: 'createdBy', select: "name" });
            return res.status(200).json({ status: "ok", data: products });
        } catch(err){
            console.log(err);
            return res.status(400).json({ status: "error", message: err.message });
        }
    }
}
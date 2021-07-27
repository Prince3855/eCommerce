const Product = require('../../models/product');

module.exports = {

    // Get all products
    getProducts : async (req,res) => {
        try{
            let products = [];
            products = await Product.find({"createdBy" : req.adminId});
            return res.status(200).json({ status: "ok", data: products });
        } catch(err){
            console.log(err)
            return res.status(400).json({ status: "error", message: err.message });
        }
    },

    // Create new product
    createProduct : async (req,res) => {
        let newProduct = req.body;
        newProduct.createdBy = req.adminId;
        try{
            await Product.create(newProduct);
            return res.status(201).json({status: "ok", message: "Product created successfully!" });
        } catch(err){
            console.log(err)
            return res.status(400).json({ status: "error", message: err.message });
        }
    },

    // Update product
    updateProduct : async (req,res) => {
        const product = req.body.product;
        try{
            await Product.findByIdAndUpdate(product._id, product);
            return res.status(200).json({status: "ok", message: "Product updated successfully!" });
        } catch(err){
            console.log(err)
            return res.status(400).json({ status: "error", message: err.message });
        }
    },

    // Remove product
    removeProduct : async (req,res) => {
        try{
            await Product.findByIdAndDelete(req.body.productId);
            return res.status(200).json({ status: "ok", message: "Product removed successfully!" });
        } catch(err) {
            console.log(err)
            return res.status(400).json({ status: "error", message: err.message });
        }
    }

}
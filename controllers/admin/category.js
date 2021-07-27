const Category = require('../../models/category');

module.exports = {

    // Get all categories
    getCategories : async (req,res) => {
        try{
            const categories = await Category.find();
            // console.log(categories);
            return res.status(200).json({ status: "ok", data: categories });
        } catch(err){
            console.log(err)
            return res.status(400).json({ status: "error", message: err.message });
        }
    },

    // Create new category
    createCategory : async (req,res) => {
        try{
            const newCategory = await Category.create(req.body);
            return res.status(201).json({ status: "ok", message: "category created successfully!" });
        } catch(err){
            console.log(err)
            return res.status(400).json({ status: "error", message: err.message });
        }
    },

    // Remove category
    removeCategory : async (req,res) => {
        try{
            await Category.findByIdAndDelete(req.body.categoryId);
            return res.status(200).json({ status: "ok", message: "Category removed successfully!" });
        } catch(err){
            console.log(err)
            return res.status(400).json({ status: "error", message: err.message });
        }
    }

}
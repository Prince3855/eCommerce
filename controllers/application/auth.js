const Customer = require('../../models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    // Register as a Customer
    postRegister : async (req,res) => {
        const newCustomer = req.body;

        try{

            const user = await Customer.findOne({"email" : newCustomer.email});
            if(user){
                return res.status(400).json({ message : "User already registered!" });
            }

            // encrypt password
            const salt = await bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hashSync(newCustomer.password, salt);
            newCustomer.password = hashPassword;

            const customer = await Customer.create(newCustomer);

            return res.status(201).json({ status : "ok", message: "Customer registered successfully."});

        } catch(err) {
            console.log(err);
            return res.status(400).json({ status : "error", message : err.message });
        }
    },

    // Login as a Customer
    postLogin : async (req,res) => {
        const { email, password } = req.body;
        try{
            const user = await Customer.findOne({"email": email});
            // invalid user
            if(!user) return res.status(400).json({ status: "error", message: "User not found!"});
            
            // match password
            if(user && await bcrypt.compare(password, user.password)){
                // create jwt token
                const token = await jwt.sign({customerId : user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).json({status: "ok", token});
            } else {
                // invalid password
                return res.status(400).json({status: "error", message: "Invalid password!"});
            }
        } catch(err) {
            console.log(err);
            return res.status(400).json({ status : "error", message : err.message });
        }
    }

}
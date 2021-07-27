const Admin = require('../../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    // Register as a admin
    postRegister : async (req,res) => {
        const newAdmin = req.body;

        try{

            const user = await Admin.findOne({"email" : newAdmin.email});
            if(user){
                return res.status(400).json({ message : "User already registered!" });
            }

            // encrypt password
            const salt = await bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hashSync(newAdmin.password, salt);
            newAdmin.password = hashPassword;

            const admin = await Admin.create(newAdmin);

            return res.status(201).json({ status : "ok", message: "admin user created."});

        } catch(err) {
            console.log(err);
            return res.status(400).json({ status : "error", message : err.message });
        }
    },

    // Login as a Admin
    postLogin : async (req,res) => {
        const { email, password } = req.body;
        try{
            const user = await Admin.findOne({"email": email});
            // invalid user
            if(!user) return res.status(400).json({ status: "error", message: "User not found!"});
            
            // match password
            if(user && await bcrypt.compare(password, user.password)){
                // create jwt token
                const token = await jwt.sign({adminId : user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });

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
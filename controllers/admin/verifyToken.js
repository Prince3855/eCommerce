const jwt = require('jsonwebtoken');

module.exports = {

    // verify token
    verify : async(req,res,next) => {
        let token = req.header("authorization");
        
        if (token && token.startsWith("Bearer ")) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
        }
        try {
            if(!token) return res.status(400).json({ status: "error", message: "Authorization required!" });
            const payload = await jwt.verify(token, process.env.JWT_SECRET);
            req.adminId = payload.adminId;
            next();
        } catch (err) {
            console.log(err);
            return res.status(400).json({ status: "error", message: "Invalid Token!" });
        }
    }

}
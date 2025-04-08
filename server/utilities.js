const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: true, message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: true, message: "Invalid Token." });
        }

        req.user = user;
        next(); 
    });
};

module.exports = { authenticateToken };

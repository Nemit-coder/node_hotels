const jwt = require('jsonwebtoken');

const jwtAuthMiddlware = (req, res, next) => {
    //Extract the jwt token from the request header
    const token = req.headers.authorization.split(' ')(1);
    if(!token){
        return res.status(401).json({error : 'Unauthorized'});
    }

    try {
        //verify the JWT Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        console.log(err);
        res.status(401).json({error : 'Invalid token'});
    }
}

// Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = {jwtAuthMiddlware, generateToken};
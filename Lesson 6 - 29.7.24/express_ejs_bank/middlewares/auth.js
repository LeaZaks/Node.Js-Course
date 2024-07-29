const jwt = require('jsonwebtoken');
const User = require('../models/user');

// JWT authentication middleware
const authenticateJWT = async (req, res, next) => {
    console.log('Authenticating');

    const token = req.signedCookies.testBank;

    if(!token){
        console.log('Authentication: No Token Provided!');
        return res.redirect('../auth/login');

    }

    try{
    //Verify the JWT token and is valid
    const parsedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(parsedToken);
    delete user.password;
    res.locals.user = user;


    }
    catch(err){
        res.redirect('../auth/login', {error:err.message});
    }
    finally{
        next();
    }
};

module.exports = authenticateJWT;
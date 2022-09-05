const jwt = require('jsonwebtoken');
require('dotenv').config('variables.env');

module.exports = function(req, res, next){

    //Read header token
    const token = req.header('x-auth-token');
    //console.log(token);
    //Verify if the token exist
    if( !token ){
        return res.status(401).json({ msg: "Don't have token, invalid action."})
    }

    //Validate token
    try {
        const encrypted = jwt.verify(token, process.env.SECRET);
        req.user = encrypted.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: 'Invalid Token.' });
    }
}
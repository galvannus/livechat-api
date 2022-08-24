const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {

    //Verify errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        //Verify if user is register
        let user = await User.findOne({ email });
        if( !user ){
            return res.status(400).json({ msg: 'User not exist.' })
        }

        //Verify password
        const correctPassword = await bcryptjs.compare(password, user.password);
        if( !correctPassword ){
            return res.status(400).json({ msg: 'Incorrect password' });
        }

        //Create and sign JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        //Sign JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 //1 HORA
        }, (error, token) => {
            if(error ) throw error;
            
            //Message of confirmation
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Error ocurred.' });
    }
}

//Get user authenticated
exports.userAuthenticated = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'An error ocurred' });
    }
}
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
//require('dotenv').config({ path: 'variables.env' });

exports.createUser = async (req, res) => {

    //Verify errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() })
    }
    
    //Extract email and password
    const { email, password } = req.body;

    try {

        //Verify if an user exist with the same email
        let user = await User.findOne({ email });

        if(user){
            return res.status(400).json({ msg: 'An user with the same email already exist.'});
        }
        
        //Creating user
        user = new User(req.body);

        //Hashing password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //Save User
        await user.save();

        //Message of confirmation
        res.json({ msg: 'User created successfully.'});

        /*
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
        */

    } catch (error) {
        console.log(error);
        res.status(400).send('Have an error');
    }

}

exports.findUser = async (req, res) => {
    //Extract last name
    const { name } = req.body;

    try{
        //Search user
        let userList = await User.find(
            {
                lastName: { $regex: name },
                role: '62a95124e66466e03db0880b'//TODO: change for a list of roles
            }
        ).limit(4).select([ '_id','lastName']);//TODO: search for first name

        /* if(userList){
            return res.status(400).json({ msg: 'An error with the user.'});
        } */

        //Send result
        res.json({ userList });

    }catch(error){
        console.log(error);
        res.status(400).send('Have an error');
    }
}
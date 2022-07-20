const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

//Verify User

//api/auth
router.post('/',
    [
        check('email', 'Add a valid email.').isEmail(),
        check('password', 'Minimun Six characters for the password.').isLength({ min: 6 })
    ],
    authController.authUser
);

module.exports = router;
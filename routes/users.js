const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

//Create user
//api/users
router.post('/',
    auth,
    /* [
        check('firstName', 'The firstName is required.').not().isEmpty(),
        check('secondName', 'The secondName is required.').not().isEmpty(),
        check('email', 'Add a valid email.').isEmail(),
        check('password', 'Minimun Six characters for the password.').isLength({ min: 6 })
    ], */
    userController.createUser
);

//Find user
//api/users
router.get('/',
    userController.findUser
);

module.exports = router;
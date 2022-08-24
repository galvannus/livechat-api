const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

//Login user
//api/auth
router.post('/',
    /* [
        check('email', 'Add a valid email.').isEmail(),
        check('password', 'Minimun Six characters for the password.').isLength({ min: 6 })
    ], */
    authController.authUser
);

router.get('/',
    auth,
    authController.userAuthenticated
);

module.exports = router;
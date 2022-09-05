const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

//Create Role
//api/roles
router.post('/',
    roleController.createRole
);

//Get Role List
//api/roles
router.get('/',
    roleController.getRoleList
);

module.exports = router;
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

//Create Role

//api/roles
router.post('/',
    roleController.createRole
);

module.exports = router;
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');


//api/chats

//Create Chat
router.post('/',
    auth,
    [
        check('users', 'Minimun of 2 peoples for create a chat.').isLength({ min: 2})
    ],
    chatController.createChat
);

//Update chats
router.put('/:id',
    auth,
    chatController.updateChat
);

//Delete chats
router.delete('/:id',
    auth,
    chatController.deleteChat
);

//Read chats
router.get('/:id',
    chatController.readChat
);

module.exports = router;
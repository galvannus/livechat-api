const Chat = require('../models/Chat');
const User = require('../models/User');

exports.createChat = async (req, res) => {

    try {

        const createdBy = req.body.createdBy;

        const totalUsers = await req.body.users.filter( (users) => {
            return true;
        });

        if( totalUsers.length < 2 ){
            return res.status(400).json({ errors: 'Do you need one more person to open a chat.' });
        }
        
        if( createdBy.length < 1){
            return res.status(400).json({ errors: 'Do you need send your id.' });
        }

        //TODO: Refactor this
        const firstUser = await User.findById(req.body.users[0].userId);
        const secondUser = await User.findById(req.body.users[1].userId);
        
        let firstNameUser1 = firstUser.firstName.split(" ", 1);
        let lastNameUser1 = firstUser.lastName.split(" ", 1);
        let firstNameUser2 = secondUser.firstName.split(" ", 1);
        let lastNameUser2 = secondUser.lastName.split(" ", 1);

        const newChat = {};

        newChat.users = [
            {_id: firstUser._id, name: firstNameUser1 +" "+ lastNameUser1},
            {_id: secondUser._id, name: firstNameUser2 +" "+ lastNameUser2}
        ];
        
        let chat;
        let userChat;
        const currentChat = {};

        //Create Chat
        chat = new Chat(newChat);

        //Save Chat
        await chat.save();

        currentChat._id = chat._id;
        
        //Get the user different to the creator
        userChat = chat.users.filter(user => user._id.toString() !== createdBy);
        //Split the user from the array
        userChat.forEach(user => userChat = user);
        currentChat.user = userChat;
        console.log(currentChat);

        //Confirmation
        res.status(200).json(currentChat);
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Have an error!!');
    }
}

exports.updateChat = async (req, res) => {

    const { user_id, body, type, author, viewed } = req.body;

    const newMessage = {};

    if( body ){
        newMessage.body = body;
    }
    if( type ){
        newMessage.type = type;
    }
    if( author ){
        newMessage.author = author;
    }
    if(user_id){
        newMessage.user_id = user_id;
    }
    if(viewed){
        newMessage.viewed = viewed;
    }
    //newMessage.date = Date.now();

    

    try{

        //Get the chat
        let chat = await Chat.findById(req.params.id);

        //if the chat exist
        if( !chat ){
            return res.status(404).json({ msg: "Chat doesn't exist."});
        }

        //Verify the author
        let canCreateMessage = false;
        let usersArray = chat.users;

        await usersArray.forEach( (user) => {

            if( user.user_id.toString() == req.user.id){
                canCreateMessage = true;
            }
        });

        if( !canCreateMessage ){
            return res.status(401).json({ msg: 'Unauthorized.' })
        }

        //Add Message
        await chat.messages.push(newMessage);
        await chat.save();

        //Message of confirmation
        res.json({ msg: "Messsage sended."})
        
    }catch(error){
        console.log(error);
        res.status(500).send('Server error');
    }
}

exports.deleteChat = async (req, res) =>{

    try {
        
        //Get the chat
        let chat = await Chat.findById(req.params.id);

        //if the chat exist
        if( !chat ){
            return res.status(404).json({ msg: "Chat doesn't exist."});
        }

        //Verify the author
        let canDeleteChat = false;
        let usersArray = chat.users;

        await usersArray.forEach( (user) => {

            if( user.user_id.toString() == req.user.id){
                canDeleteChat = true;
            }
        });

        if( !canDeleteChat ){
            return res.status(401).json({ msg: 'Unauthorized.' })
        }

        //Delete chat
        await Chat.findOneAndRemove({ _id: req.params.id });

        //Message of confirmation
        res.json({ msg: 'Chat deleted.' });

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error.');
    }
}

exports.readChat = async (req, res) => {

    try {

        const { userId } = req.query;

        if(userId === ''){
            return res.status(404).json({ msg: "Invalid User."});
        }

        let chats = await Chat.find({
            users: { $all: [userId]}
        });

        console.log(chats);
    } catch (error) {
        
    }
}
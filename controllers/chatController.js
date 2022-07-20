const Chat = require('../models/Chat');

exports.createChat = async (req, res) => {
    try {

        const totalUsers = await req.body.users.filter( (users) => {
            return true;
        });

        if( totalUsers.length < 2 ){
            return res.status(400).json({ errors: 'Do you need one more person to open a chat.' });
        }
        
        let chat;

        //Create Chat
        chat = new Chat(req.body);

        //Save Chat
        await chat.save();

        //Confirmation
        res.status(200).send("Chat Created");
        
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
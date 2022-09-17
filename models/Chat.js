const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({

    users: [

        {
            _id: {type: mongoose.Types.ObjectId},
            name: {type: String},

        }
    ]/* ,
    messages: [
        {
            userId: {type: mongoose.Types.ObjectId},
            author: {type: String},
            body: {type: String},
            type: {type: String},
            date: {type: Date, default: Date.now()},
            viewed: {type: Boolean}
        }
    ] */
});

module.exports = mongoose.model('Chat', ChatSchema);
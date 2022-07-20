const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//Create server
const app = express();

//Connect to DB
connectDB();

//Able cors
app.use( cors() );

//Able express.json
app.use( express.json({ extended: true }) );

const PORT = process.env.PORT || 4000;

//Routes import
app.use('/api/users', require('./routes/users'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/chats', require('./routes/chats'));
app.use('/api/auth', require('./routes/auth'));

//Run server
app.listen(PORT, () => {
  console.log(`Server On port ${PORT}`);
});

//Only for watch the server in the explorer
/*
app.get("/", (req, res) => {
  res.send(`Server Online on port ${PORT}`);
});
*/

//npm i -D nodemon
//npm i express mongoose dotenv
//npm install bcryptjs
//npm i express-validator
//npm install jsonwebtoken
//npm i cors
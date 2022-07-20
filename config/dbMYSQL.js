const mysql = require("mysql2");
let errorConnection = "";

const connection = mysql.createPool({
    host: "192.168.100.6",
    user: "root",
    password: "123123op",
    database: "livechat_db",
    waitForConnections: true,
    connectionLimit: 10
});


connection.getConnection((err) => {
    
    if(err){

        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }else if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS NO MANY CONNECTIONS');
        }else if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }else if(err.code === 'ETIMEDOUT'){
            console.error('TIMEOUT CONNECTING TO DB');
        }

    }else{
        console.log("Connected to database tasks");
    }

});


const promiseConnection = connection.promise();

module.exports = { promiseConnection };


/*
connection.on('error', (err) => {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        //handleDisconnectPrincipal();              // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
    }
});
*/
/*
//Connecting to DB
connection.connect( (err) => {
    if(err) return 'error connecting: ' + err.stack;
    console.log('Connected to DB as id ' + connection.threadId);
});
*/
/*
connection.end();
*/


const mysql = require("mysql2");
const { promiseConnection } = require("../config/db");

exports.createUser = async (req, res) => {

    //Extracting data from request
    const { username, password, firstname, secondname, email } = req.body;

    try{
        const [emailExist] = await promiseConnection.execute("SELECT email FROM users WHERE email = ?",
        [email]);

        if( emailExist.length > 0 ){
            res.send("El usuario ya Existe.")
        }else{
            
            //Creating Query
            const [userCreated] = await promiseConnection.execute("INSERT INTO users(firstname, secondname, username, password, email) VALUES (?, ?, ?, ?, ?)", 
            [firstname, secondname, username, password, email]);
            
            if(userCreated.affectedRows === 1 && userCreated.serverStatus === 2){
                res.send("¡¡USUARIO REGISTRADO CORRECTAMENTE!!");
            }
        }
        
    } catch (error) {
        
        switch (error.code) {

            case 'PROTOCOL_CONNECTION_LOST':
                res.send('DATABASE CONNECTION WAS CLOSED');
                break;
            case 'ER_CON_COUNT_ERROR':
                res.send('DATABASE HAS NO MANY CONNECTIONS');
                break;
            case 'ECONNREFUSED':
                res.send('DATABASE CONNECTION WAS REFUSED');
                break;
            case 'ETIMEDOUT':
                res.send('TIMEOUT CONNECTION TO DB');
                break;
        
            default:
                res.send(error);
                break;
        }
    }
    
}

/*promiseConnection.query(sql, (err, result) => {
        
        if(err){
        
            console.log('Error Query:', err.code)
    
            if(err.code === 'PROTOCOL_CONNECTION_LOST'){
                res.send('DATABASE CONNECTION WAS CLOSED');
            }else if(err.code === 'ER_CON_COUNT_ERROR'){
                res.send('DATABASE HAS NO MANY CONNECTIONS');
            }else if(err.code === 'ECONNREFUSED'){
                res.send('DATABASE CONNECTION WAS REFUSED')
            }else if(err.code === 'ETIMEDOUT'){
                res.send('TIMEOUT CONNECTION TO DB')
            }
        }else{
            console.log(result.serverStatus);
            res.send(result);
        }
});
*/
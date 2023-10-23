//import mysql module
const mysql = require('mysql');
//configuration for connecting with mysql database
var connection = mysql.createConnection({
    host: 'localhost',
    //there is a database "product" in your mysql server
    database: 'product',
    //user and password to access mysql
    //newuser has all the privilages as the root user
    user: 'newuser',
    //password if there is any
    password: 'Amlesubirhanu123@'
});

//check if connection is successful
connection.connect(function(error){
    if(error){
        throw error;
    }
    else{
        console.log('mysql db connected successfully');
    }
});

//export for routes that need this database connection
module.exports = connection;

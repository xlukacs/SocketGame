require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const cors = require('cors');


const app = express();

// var allowlist = ['http://localhost:8080', 'http://http://192.168.1.102:8080','http://localhost:8081']
var corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 
}
  
// SETUP API
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");  //allowlist parser TODO
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS"); 
    res.header("Access-Control-Allow-Headers", "X-Auth-Token, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
 
//SETUP SERVER
 const server = app.listen(3000, function () {
     let host = server.address().address
     let port = server.address().port
     console.log("Listening on: " + host + ":" + port);
 })


const authRouter = require('./API/auth')
const usersRouter = require('./API/users')
const itemsRouter = require('./API/items')
const shopRouter = require('./API/shop')
const rankRouter = require('./API/rank')
//==============API CALLS=================
app.use('/API/auth', authRouter)
app.use('/API/users', usersRouter)
app.use('/API/items', itemsRouter)
app.use('/API/shop', shopRouter)
app.use('/API/rank', rankRouter)

//==============EXPERIMENTAL CALLS=================
app.all('/', (req,res) => {
    console.log(req)
    console.log("404 not found API call.")
    res.status(404).send("Invalid API call.")
})


//==============SOCKET HANDLING===============
const io = require('socket.io')(server, { cors: { origin: "http://localhost:8080" }}) //8081 PORT AS WELL =================================
app.io = io;

const socketHandler = require('./sockets/socket_server')
socketHandler(io);
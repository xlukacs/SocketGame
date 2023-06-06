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

io.on('connection', (socket) => {
    // let maps = ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6'];
    let users = [];
    console.log('User connected:' + socket.id)

    socket.on('join_game_map', (data) => {
        console.log('map joining: ' + data.server + data.map)
        if(!users.find(user => user.id === data.user_id)){
            users.push({
                id: data.user_id,
                position: {
                    x: data.position.x,
                    y: data.position.y
                }
            })

            socket.join('map');
        }else{
            console.log("Allready in that channel.");
        }

        // const roomSockets = io.sockets.adapter.rooms.get(data.map);
        // console.log(roomSockets)

        io.sockets.emit('user_joined', { user_id: data.user_id, position: data.position }); //.broadcast.to(data.map)
    })

    socket.on('activated_drone_formation', (data) => {
        // console.log('user changed formation: ' + data.playerName, data.formation)
        io.sockets.emit('user_activated_drone_design', { playerName: data.playerName, formation: data.formation });
    })

    socket.on('object_moved', (data) => {
        // console.log('object moved formation: ' + data.objectName, data.from, data.to)
        io.sockets.emit('object_moved', { objectName: data.objectName, from: data.from, to: data.to });
    })
})
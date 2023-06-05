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
        console.log('channel joining: ' + data.server + data.map)
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
        console.log("User spawning at: ", data.position, data.user_id)
    })

    socket.on('activated_drone_formation', (data) => {
        console.log('user changed formation: ' + data.playerName, data.formation)
        io.sockets.emit('user_activated_drone_design', { playerName: data.playerName, formation: data.formation });
    })
})

// io.on("connection", (socket) => {
//     let userRooms = [];
//     console.log('User connected:' + socket.id)

//     socket.on('join_chat_room', room => {
//         console.log('channel joining: ' + room)
//         if(userRooms.indexOf(room) == -1){
//             userRooms.push(room)
//             socket.join(userRooms);
            
//             console.log("Now connected to: " + userRooms)
//         }else{
//             console.log("Allready in that channel.");
//         }
//     })

//     socket.on('leave_chat_room', (room) => {
//         console.log('channel left:' + room)
//         socket.broadcast.to(room).emit('user_disconnect')
//     })

//     socket.on('message_received_conf', (room) => {
//         socket.broadcast.to(room).emit('message_received_confirm')
//     })

//     socket.on('message_send', (message, message_details, room) => {
//         socket.emit('message_sent_confirm')
//         socket.broadcast.to(room).emit('message_received', { message: message, has_attachment: false, user_id: message_details.user_id });
        
//         console.log("Notification sent to: " + 'user-' + message_details.partner_id + '-broadcast') 
//         socket.to('user-' + message_details.partner_id + '-broadcast').emit('notification_broadcast', { type: 'new_message', message: message, has_attachment: false, user_id: message_details.user_id })
//     })
    
//     socket.on('send_notification', (data) => {
//         console.log(data)
//         if(data.type == 'friend_request'){
//             console.log("Notification sent to: " + 'user-' + data.requested_id + '-broadcast') 
//             socket.to('user-' + data.requested_id + '-broadcast').emit('notification_broadcast', { type: 'friend_request', from_id: data.sender_id })
//         }else{
//             console.log('Unknown notification type.')
//         }
//     })

//     socket.on('testEvent', (data) => {
//         console.log('User sent: ' + data.message);

//         socket.emit('testListener', 'data');
//     })

//     socket.on('rtc-message', (data) => {
//         socket.broadcast.emit('onmessage', data)
//     })
// })
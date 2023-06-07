module.exports = (io) => {
    io.on('connection', (socket) => {
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
};
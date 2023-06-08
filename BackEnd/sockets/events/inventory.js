module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log("A user connected to inventory.js", socket.id);
        socket.on('updateDroneDesign', (data) => {
            io.sockets.emit('user_updated_droneDesign', { playerName: data.user, nthDrone: data.nthDrone, droneDesign: data.design });
        });
    });
};
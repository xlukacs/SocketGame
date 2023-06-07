const socketServer = (io) => {  
    // Import event handlers
    const gameEvents = require('./events/game');
    const inventoryEvents = require('./events/inventory');
  
    // Call event handlers
    gameEvents(io);
    inventoryEvents(io);
  };
  
  module.exports = socketServer;
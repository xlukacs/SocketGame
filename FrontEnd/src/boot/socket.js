import socketio from "socket.io-client";
import VueSocketIO from "vue-3-socket.io";
import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  const socket = socketio("http://localhost:3000"); // Replace with your Socket.IO server URL

  app.use(
    new VueSocketIO({
      debug: true,
      connection: socket,
    })
  );
});

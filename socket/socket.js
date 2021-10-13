import io from "socket.io-client";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};
let socket = io("https://alumina-connect.herokuapp.com/", connectionOptions);
export default socket;

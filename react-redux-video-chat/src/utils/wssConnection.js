import { io } from "socket.io-client";

const SERVER = "http://localhost:5000";

let socket;

export const connectWithWebSocket = () => {
    socket = io(SERVER);

    socket.on("connection", () => {
        console.log('Successfully connected with wss server.');
        console.log(socket.id);
    });
};
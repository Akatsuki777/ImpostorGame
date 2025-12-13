import {io} from './socket.io.min.js'

export var socket = null;

export function connectSocket(){
    socket = io(window.location.origin, {
        withCredentials: true, 
    });

    socket.on("connect", () => {
        console.log("Connected to server", socket.id);
    });

    socket.on("disconnect", (reason) => {
        console.log("Disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
    });

    socket.onAny((event, data) => {
        console.log("Received event:", event, data);
    });
}

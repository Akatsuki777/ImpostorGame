import {io} from './socket.io.min.js'

export var socket = null;

let activeSocketRoom = null;

function emitActiveSocketRoom(){
    if (!socket?.connected || !activeSocketRoom) {
        return;
    }

    socket.emit("join_socket_room", {
        room_id: activeSocketRoom.roomId,
        player_index: activeSocketRoom.playerIndex
    });
}

export function setActiveSocketRoom(roomId, playerIndex){
    activeSocketRoom = {
        roomId,
        playerIndex
    };

    emitActiveSocketRoom();
}

export function connectSocket(){
    socket = io(window.location.origin, {
        withCredentials: true, 
    });

    socket.on("connect", () => {
        console.log("Connected to server", socket.id);
        emitActiveSocketRoom();
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

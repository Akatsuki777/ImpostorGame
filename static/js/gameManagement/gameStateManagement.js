import { setActiveSocketRoom, socket } from "../plugins/sockets.js";
import { TEMPLATES } from "../stage_management/elementsBuilder.js";
import { createHTML } from "../stage_management/helpers.js";
import { ROOM_ID, USERNAME, PLAYER_COLORS,setPlayers } from "./gameManagement.js";

const ACTIVE_ROOM_STORAGE_KEY = "impostor_active_room_id";

export async function getPlayers(){

    const res = await fetch(`/room_info/${ROOM_ID}`);
    const data = await res.json();
    
    if(data.success){
        updatePlayersInLobby(data.players);
    } 
    
    socket.on("player_list", data => {
        updatePlayersInLobby(data.players);
        setPlayers(data.players);
    });

}

export function getActiveRoomId(){
    return sessionStorage.getItem(ACTIVE_ROOM_STORAGE_KEY);
}

export function saveActiveRoom(room_id){
    sessionStorage.setItem(ACTIVE_ROOM_STORAGE_KEY, room_id);
}

export function clearActiveRoom(){
    sessionStorage.removeItem(ACTIVE_ROOM_STORAGE_KEY);
}

export async function getRoomInfo(room_id){
    try {
        const res = await fetch(`/room_info/${room_id}`, {
            credentials: "include"
        });
        const data = await res.json();

        if (!data.success) {
            return { success: false, error: data.error };
        }

        return {
            success: true,
            room_id: data.room_id,
            player_index: data.player_index,
            is_owner: data.is_owner,
            game_started: data.game_started,
            score: data.score,
            secret: data.secret,
            players: data.players
        };
    } catch (err) {
        console.error("Error restoring room:", err);
        return { success: false, error: "Network error" };
    }
}

export async function getCurrentRooms(){
    try {
        const res = await fetch("/current_rooms", {
            credentials: "include"
        });
        const data = await res.json();

        if (!data.success) {
            return { success: false, error: data.error };
        }

        return {
            success: true,
            rooms: data.rooms
        };
    } catch (err) {
        console.error("Error loading rooms:", err);
        return { success: false, error: "Network error" };
    }
}

export async function createRoom(){

    const res = await fetch('/create_room',{
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            USERNAME
        })
    });

    const data = await res.json();

    if(data.success){
        return { success: true,  room_id: data.room_id};
    } else {
        return {success: false};
    }

}


export async function joinRoom(room_id) {
    try {
        const res = await fetch("/join_room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ room_id })
        });

        const data = await res.json();

        if (!data.success) {
            console.error("Join room failed:", data.error);
            return { success: false, error: data.error };
        }

        const playerIndex = data.player_index;
        
        joinSocketRoom(room_id,playerIndex);

        return {
            success: true,
            player_index: playerIndex
        };

    } catch (err) {
        console.error("Error joining room:", err);
        return { success: false, error: "Network error" };
    }
}

export function joinSocketRoom(room_id,playerIndex){
    setActiveSocketRoom(room_id, playerIndex);
}

export function updatePlayersInLobby(players){

    const roomList = document.querySelector('.im_room_id_list');
    roomList.innerHTML = '';

    players.map((item,index)=>{
        const player = createHTML(TEMPLATES.roomIdListItem);
        player.children[0].style.backgroundColor = PLAYER_COLORS[index];
        player.children[1].children[0].innerText = item;
        roomList.append(player);
    })
}

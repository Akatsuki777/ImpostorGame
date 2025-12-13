import { isLoggedIn, register, login } from "../static/userManagement.js"; 
import { buildAuthOption, buildMainMenu, buildHomeScreen, removeAuthOption, buildAuth, buildWaitLobby, buildEnterLobby, removeAuth, removeMainMenu, removeImpostor, removeEnterLobby } from "./elementsBuilder.js";
import { createRoom, joinRoom, joinSocketRoom} from "../gameManagement/gameStateManagement.js";
import { connectSocket } from "../plugins/sockets.js";
import { ROOM_ID,linkSockets, startGame,setUsername,  setRoomId,  setPlayerIndex } from "../gameManagement/gameManagement.js";

export async function loadHome(){

    buildHomeScreen();

    const user = await isLoggedIn();


    buildAuthOption();

    // if (user.loggedIn){
    //     buildMainMenu();
    // } else {
    // }
}


//Logic Flow 

export function onAuthOptionHandler(isLogin){
    removeAuthOption();
    setTimeout(()=>{
        buildAuth(isLogin);
        const button = document.querySelector("#authButton");
        button.addEventListener("click",handleAuth);
    },520)
}

async function handleAuth(e){
    e.preventDefault();
    const endpoint = e.target.innerText=="LOGIN"?'login':'signup';
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if(endpoint === "login"){

        const respose = await login(username, password);

        if(respose.success){
            setUsername(username);
            new Toast("0",`Logged in successfully as ${username}`,2,document.querySelector("body"));
        } else {
            new Toast("1",`Failed to log in as ${username}. Error! ${response.error}`,2,document.querySelector("body"));
            return;
        }

        connectSocket();

        document.querySelector("#authButton").removeEventListener("click",handleAuth);
        removeAuth();
        setTimeout(()=>{
            buildMainMenu();
            document.getElementById("im_start_room").addEventListener("click",handleCreateRoom);
            document.getElementById("im_join_room").addEventListener("click",handleJoinRoom);
        },500);

    } else {
        const respose = await register(username, password);

        if(respose.success){
            new Toast("0",`Registered Successfully as ${username}`,2,document.querySelector("body"));
        } else {
            new Toast("1",`Failed to register as ${username}. Error! ${respose.error}`,2,document.querySelector("body"));
            return;
        }

        document.querySelector("#authButton").removeEventListener("click",handleAuth);
        removeAuth();
        setTimeout(()=>{
            buildAuth(true);
            const button = document.querySelector("#authButton");
            button.addEventListener("click",handleAuth);
        },500);
    }

}

async function handleJoinRoom(){
    removeMainMenu();
    removeImpostor();
    setTimeout(()=>{
        buildEnterLobby();
        document.querySelector("#roomIdButton").addEventListener("click",roomJoinHandler);
    },520);
}

async function roomJoinHandler(){
    const button = document.getElementById("roomIdButton");

    if(button.classList.contains('inactive')){
        return;
    }

    const room_id = document.querySelector('.grey > p').innerText;
    const res = await joinRoom(room_id);

    if(res.success){
        setPlayerIndex(res.player_index);
        setRoomId(room_id);
    } else {
        new Toast("1",`Failed to join room`,2,document.querySelector("body"));
        return;
    }

    removeEnterLobby();
    setTimeout(()=>{
        buildWaitLobby(false,ROOM_ID);
        //Link the sockets to handle socket emits
        linkSockets();
    },520);

}


async function handleCreateRoom(){

    const response = await createRoom();

    if(response.success){
        setRoomId(response.room_id);
        setPlayerIndex(0);
    } else {
        new Toast("1",`Failed to create room! Try again.`,2,document.querySelector("body"));
        return;
    }

    joinSocketRoom(ROOM_ID,0);

    document.getElementById("im_start_room").removeEventListener("click",handleCreateRoom);
    removeMainMenu();
    removeImpostor();
    setTimeout(async ()=>{
        buildWaitLobby(true,ROOM_ID);
        //Link the sockets to handle events
        await linkSockets();
        document.querySelector("#roomIdButton").addEventListener("click",gameStartHandler);
    },520);

}

async function gameStartHandler(){

    const button = document.querySelector("#roomIdButton");
    startGame();
}
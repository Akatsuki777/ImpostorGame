import { buildGameScreen, removeTopBar, removeWaitLobby } from "../stage_management/elementsBuilder.js";
import { NotificationButton } from "../plugins/notificationButton.js";
import { GameCard } from "../plugins/GameCard.js";
import { socket } from "../plugins/sockets.js";
import modalObject from "../plugins/ModalObject.js";

export var scoreContainer = null;
export var impostorContainer = null;
export var gameButton = null;
export var messageButton = null;
export var gameCount = 0;
export const PLAYER_COLORS = ['#ffc100','#c356ea','#8ff243','#71aef2','#ea5645']
export var ROOM_ID = null;
export var USERNAME = null;
export var PLAYER_INDEX = null;
export var SCORE = 0;
export var SECRET = '';
export var PLAYERS = [];

export function setRoomId(value){
    ROOM_ID = value;
}

export function setUsername(value){
    USERNAME = value;
}

export function setPlayerIndex(value){
    PLAYER_INDEX = value;
}

export function setScore(value){
    SCORE = value;
}

export function setSecret(value){
    SECRET = value;
}

export function setPlayers(players){
    PLAYERS = players;
}

export async function startGame(){

    socket.on("game_error",data => {
        new Toast("1",data.message,1,document.querySelector('body'));
    })

    socket.emit("start_game",{
        room_id: ROOM_ID
    });

}

export function makeGameScreen(secret){
    buildGameScreen();
    scoreContainer = document.querySelector('.im_game_score_value');
    impostorContainer = document.querySelector('.impostor_bg')
    gameButton = document.querySelector('.im_game_control_buttons > button');

    const playerColor = document.querySelector('.im_game_player_color');
    playerColor.style.backgroundColor = PLAYER_COLORS[PLAYER_INDEX];

    scoreContainer.innerText = SCORE;
    changeImpostorUI(secret === 'impostor');

    //Set other one time values
    messageButton = new NotificationButton('static/Resources/message_icon.webp');
    messageButton.setNotification(false);

    gameButton.parentNode.insertBefore(messageButton,gameButton);
    gameButton.addEventListener("click",performAction);

    const gameCard = new GameCard(secret);
    const gameCardEl = gameCard.getElement();

    const topBar = document.querySelector('.im_game_topbar');
    topBar.after(gameCardEl);
}

export async function linkSockets(){

    socket.on("secret_word",data=>{
        if(gameCount==0){
            removeWaitLobby();
            removeTopBar();
            setTimeout(()=>{
                makeGameScreen(data.secret);
            },530)
        } else {
            const curCard = document.querySelector('.im_game_card_container');
            const newCard = new GameCard(data.secret);
            newCard.replaceElement(curCard);
            changeImpostorUI(data.secret === "impostor");
        }
        SECRET = data.secret;
        gameCount++;
    });

    socket.on("initiate_consent",async (data)=>{
        const consent = await modalObject.show('confirm',data.title,data.message);
        socket.emit("respond_vote_request",{
            room_id: ROOM_ID,
            player_id: PLAYER_INDEX,
            consent: consent
        });
    });

    socket.on("initiate_voting",async (data)=>{
        var playerMap = {};
        if(SECRET !== 'impostor'){
            data.players.forEach((name,index) => {
                if(index != PLAYER_INDEX){
                    playerMap[index] = {
                        name: name,
                        color: PLAYER_COLORS[index]
                    };
                }
            });
        }
        console.log(playerMap);
        const vote = await modalObject.show('poll',playerMap,data.title,data.message);
        socket.emit('submit_vote',{
            room_id: ROOM_ID,
            target: parseInt(vote)
        })
    });

    socket.on("vote_result",data =>{
        if(data.result === 'failed_vote'){
            new Toast('1',"Voting failed due to too many 'no votes'",1,document.querySelector('body'));
        } else {
            SCORE = data.scores[PLAYER_INDEX];
            updateScore();
            new Toast('2',`${data.result==="impostor_eliminated"?'The Impostor':'An Innocent'} was eliminated`,1,document.querySelector('body'));
            setScore(data.scores[PLAYER_INDEX])
            updateScore();
            loadNextGame();
        }
    });

    socket.on("guess_result",data=>{
        if(data.correct){
            new Toast('2',"Round ended, impostor guessed the word (+2)",1,document.querySelector('body'));
        } else {
            new Toast('2',"Round ended, impostor failed to guess the word",1,document.querySelector('body'));
        }
        setScore(data.scores[PLAYER_INDEX])
        updateScore();
        loadNextGame();
    });

}

async function performAction(){
    if(SECRET==='impostor'){
        const word = await modalObject.show("input","Guess Word","Please guess the word if you found it out");
        if(word.trim() !== ""){
            socket.emit("guess_word",{
                room_id: ROOM_ID,
                guess: word
            });
        }
    } else {
        socket.emit("initiate_voting",{
            room_id: ROOM_ID,
            player_id: PLAYER_INDEX
        });
    }
}

function loadNextGame(){
    if(PLAYER_INDEX==0){
        socket.emit("start_game",{
            room_id: ROOM_ID
        });
    }
}

function updateScore(){
    scoreContainer.innerText = SCORE;
}

function changeImpostorUI(isImpostor){
    if(isImpostor){
        impostorContainer.style.opacity = '0';
        gameButton.classList.add('green_btn');
        gameButton.classList.remove('purple');
        gameButton.innerText = "GUESS WORD";
    } else {
        impostorContainer.style.opacity = '';
        gameButton.classList.remove('green_btn');
        gameButton.classList.add('purple');
        gameButton.innerText = "VOTE IMPOSTOR";
    }
}

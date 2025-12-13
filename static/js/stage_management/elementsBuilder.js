import { clearBody, makeEditable, removeEditable, createHTML, getBody, buildItem, destroyItem, makeInputEditable, removeInputEditable } from "./helpers.js";
import { getPlayers } from "../gameManagement/gameStateManagement.js";

export const TEMPLATES = {
    impostorDiv: '<div class="impostor_bg_container"><img class="impostor_bg" src="static/Resources/impostor_no_bg.webp"></div>',
    impostorTitle: '<div class="im_title_container"><p class="im_title">IMPOSTOR</p></div>',
    impostorMenu: '<div class="im_main_menu_container"><button id="im_start_room" class="im_buttons">START ROOM</button><button id="im_join_room" class="im_buttons green_btn">JOIN ROOM</button></div>',
    topShapes: `<div class="im_topBar"><div class="im_shapeFill square"><svg fill="#EBEBEB" width="80px" height="80px" viewBox="0 0 50 50" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" overflow="inherit"><path d="M1 1h48v48h-48z"/></svg><svg fill="#FA448C" width="80px" height="80px" viewBox="0 0 50 50" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" overflow="inherit"><path d="M1 1h48v48h-48z"/></svg></div><div class="im_shapeFill triangle"><svg width="100px" height="100px" fill="#EBEBEB" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490" xml:space="preserve"><polygon points="245,456.701 490,33.299 0,33.299 "/></svg><svg width="100px" height="100px" fill="#43B5A0" viewBox="0 0 490 490" style="enable-background:new 0 0 490 490" xml:space="preserve"><polygon points="245,456.701 490,33.299 0,33.299 "/></svg></div><div class="im_shapeFill pentagon"><svg width="110px" height="110px" fill="#EBEBEB" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.847 22H5.215L.397 9.544 12 1l11.6 8.543z"/></svg><svg width="110px" height="110px" fill="#491D88" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.847 22H5.215L.397 9.544 12 1l11.6 8.543z"/></svg></div><div class="im_shapeFill cloud"><svg width="110px" height="110px" xmlns="http://www.w3.org/2000/svg" fill="#EBEBEB" xmlns:serif="http://www.serif.com/" version="1.1" viewBox="0 0 594.39 595.28"><path class="st0" d="M234.39,62.8C234.39,28.14,262.53,0,297.19,0s62.8,28.14,62.8,62.8c17.33-30.02,55.77-40.32,85.79-22.99,30.02,17.33,40.32,55.77,22.99,85.79,30.02-17.33,68.46-7.03,85.79,22.99,17.33,30.02,7.03,68.46-22.99,85.79,34.66,0,62.8,28.14,62.8,62.8s-28.14,62.81-62.8,62.81c30.02,17.33,40.32,55.77,22.99,85.79-17.33,30.02-55.77,40.32-85.79,22.99,17.33,30.02,7.03,68.46-22.99,85.79-30.02,17.33-68.46,7.03-85.79-22.99,0,34.66-28.14,62.8-62.8,62.8s-62.81-28.14-62.81-62.8c-17.33,30.02-55.77,40.32-85.79,22.99-30.02-17.33-40.32-55.77-22.99-85.79-30.02,17.33-68.46,7.03-85.79-22.99-17.33-30.02-7.03-68.46,22.99-85.79-34.66,0-62.8-28.14-62.8-62.81s28.14-62.8,62.8-62.8c-30.02-17.33-40.32-55.77-22.99-85.79,17.33-30.02,55.77-40.32,85.79-22.99-17.33-30.02-7.03-68.46,22.99-85.79,30.02-17.33,68.46-7.03,85.79,22.99Z"/></svg><svg width="110px" height="110px" xmlns="http://www.w3.org/2000/svg" fill="#FEC859" xmlns:serif="http://www.serif.com/" version="1.1" viewBox="0 0 594.39 595.28"><path class="st0" d="M234.39,62.8C234.39,28.14,262.53,0,297.19,0s62.8,28.14,62.8,62.8c17.33-30.02,55.77-40.32,85.79-22.99,30.02,17.33,40.32,55.77,22.99,85.79,30.02-17.33,68.46-7.03,85.79,22.99,17.33,30.02,7.03,68.46-22.99,85.79,34.66,0,62.8,28.14,62.8,62.8s-28.14,62.81-62.8,62.81c30.02,17.33,40.32,55.77,22.99,85.79-17.33,30.02-55.77,40.32-85.79,22.99,17.33,30.02,7.03,68.46-22.99,85.79-30.02,17.33-68.46,7.03-85.79-22.99,0,34.66-28.14,62.8-62.8,62.8s-62.81-28.14-62.81-62.8c-17.33,30.02-55.77,40.32-85.79,22.99-30.02-17.33-40.32-55.77-22.99-85.79-30.02,17.33-68.46,7.03-85.79-22.99-17.33-30.02-7.03-68.46,22.99-85.79-34.66,0-62.8-28.14-62.8-62.81s28.14-62.8,62.8-62.8c-30.02-17.33-40.32-55.77-22.99-85.79,17.33-30.02,55.77-40.32,85.79-22.99-17.33-30.02-7.03-68.46,22.99-85.79,30.02-17.33,68.46-7.03,85.79,22.99Z"/></svg></div></div>`,
    roomIdDiv: `<div class="im_room_id_container"><div class="im_room_id_text"><p>ROOM ID</p></div><div class="im_room_id_text grey"><p contenteditable="True">Enter Room ID</p></div></div>`,
    roomIdButton: `<div class="im_button_container"><button id="roomIdButton" class="im_buttons inactive">JOIN ROOM</button></div>`,
    waitingIcon: `<svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" class="hds-flight-icon--animation-loading"><g fill="#000000" fill-rule="evenodd" clip-rule="evenodd"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z" opacity=".2"/><path d="M7.25.75A.75.75 0 018 0a8 8 0 018 8 .75.75 0 01-1.5 0A6.5 6.5 0 008 1.5a.75.75 0 01-.75-.75z"/></g></svg>`,
    roomIdList: `<div class="im_room_id_list"></div>`,
    roomIdListItem: `<div class="im_room_participant"><div class="im_color_code"></div><div class="im_room_participant_name"><p></p></div></div>`,
    authContainer: `<div class="im_button_container login_container"><button onclick="onAuthOptionHandler(true)" class="im_buttons green_btn">Login</button><button onclick='onAuthOptionHandler(false)' class="im_buttons">Register</button></div>`,
    authForm: `<form id="auth_form" class="auth_container"><div class="auth_input_div"><input id="username" class="auth_input" type="text" value="username"></div><div class="auth_input_div"><input id="password" class="auth_input" type="password" value="somepassword"></div><div class="im_button_container"><button id="authButton" type="button" class="im_buttons green_btn">LOGIN</button></div></form>`,
    gameScreen: `<div class="im_game_screen_container"><div class="im_game_topbar"><div class="im_game_score_container"><div><p class="im_game_score_title">Score</p></div><div><p class="im_game_score_value">5</p></div></div><div class="im_game_player_color"></div></div><div class="im_game_control_buttons"><button class="im_buttons purple">VOTE IMPOSTER</button></div><div class="impostor_bg_container"><img class="impostor_bg" src="static/Resources/impostor_no_bg.webp"></div></div>`
}


//Builder Functions

export function buildAuthOption() {
    buildItem(
        [TEMPLATES.authContainer],
        [true],
        [["fade_out"]]
    );
}

export function buildAuth(isLogin) {
    const buttonText = isLogin?TEMPLATES.authForm:TEMPLATES.authForm.replace("LOGIN","REGISTER");
    buildItem(
        [buttonText],
        [true],
        [["impostor_outside_right"]]
    );

    makeInputEditable("#username");
    makeInputEditable("#password");
}

export function buildHomeScreen() {
    buildItem(
        [TEMPLATES.topShapes,TEMPLATES.impostorDiv, TEMPLATES.impostorTitle],
        [false,true, true],
        [[],["impostor_outside"], ["fade_out"]] 
    );
}

export function buildMainMenu(){
    buildItem(
        [TEMPLATES.impostorMenu],
        [true],
        [["impostor_down"]]
    );  
}

export function buildEnterLobby(){
    buildItem(
        [TEMPLATES.roomIdDiv,TEMPLATES.roomIdButton],
        [true,true],
        ['impostor_outside_right','impostor_below']
    );

    makeEditable('.grey > p',document.querySelector('#roomIdButton'));
}

export async function buildWaitLobby(isOwner,room_id){

    var templates = [TEMPLATES.roomIdDiv.replace("Enter Room ID",room_id),TEMPLATES.roomIdList];
    var animArray = [true,false];
    var animClass = ['impostor_outside_right',null];

    if(isOwner){
        templates.push(TEMPLATES.roomIdButton.replace('JOIN ROOM','START GAME'));
        animArray.push(true);
        animClass.push('fade_out');
    }

    buildItem(
        templates,
        animArray,
        animClass
    );

    document.querySelector('.grey').children[0].innerText = room_id;
    document.querySelector('.grey').classList.add('rose');
    document.querySelector('.grey').classList.remove('grey');
    document.querySelector('.rose > p').setAttribute('contenteditable','False');



    await getPlayers();

}

export function buildGameScreen(){
    buildItem(
        [TEMPLATES.gameScreen],
        [true],
        ['impostor_outside_right']
    );
}

//Remove Functions

export function removeTopBar(){
    destroyItem('.im_topBar',["impostor_above"],500);
    destroyItem('.im_title_container',["impostor_above"],500);
}

export function removeMainMenu(){
    destroyItem(".im_main_menu_container",["impostor_outside"],500);
}

export function removeAuthOption(){
    destroyItem(".login_container",["impostor_outside"],500);
}

export function removeImpostor(){
    destroyItem(".impostor_bg_container",["impostor_outside"],500);
}

export function removeAuth(){
    removeInputEditable("#username");
    removeInputEditable("#password");
    destroyItem(".auth_container",["impostor_outside"],500);
}

export function removeEnterLobby(isOwner){
    removeEditable('.grey > p');
    destroyItem('.im_room_id_container',["imposter_outside"],500);
    destroyItem('#roomIdButton',['fade_out'],500);
}

export function removeWaitLobby(){
    destroyItem('.im_room_id_container',["imposter_outside"],500);
    destroyItem('#roomIdButton',['fade_out'],500);
    destroyItem('.im_room_id_list',['fade_out'],500);
}

export function removeGameScreen(){
    destroyItem('.im_game_screen_container',['impostor_outside'],500);
}
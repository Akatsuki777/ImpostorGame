import {io, Socket} from 'socket.io-client';
import type { GameActionType } from '../../contextProviders/GameStateProvider';

//Interfaces for Socket

export interface ClientToServerEvents {
    start_room: (props: {
        player_id: string
    })=>void;
    start_game: (props: {
        room_id: string
    }) => void;
    join_room: (props: {
        room_id: string,
        player_id: string
    })=>void;
    exit_room: (props:{
        room_id: string
    })=>void;
    close_room: (props:{
        room_id: string
    }) => void;
    initiate_voting_consent: (props: {
        room_id: string,
        player_id: string
    })=>void;
    guess_word: (props: {
        room_id: string,
        player_id: string,
        guessed_word: string
    })=>void;
    consent_response: ()=>void;
    score_updates: (props: {
        score_data:{
            players: string[],
            scores: number[]
        }
    })=>void;
}

export interface ServerToClientEvents {
    game_event: (props: GameActionType)=>void;
    game_started: (props: {
        secret: string
    })=>void;
    member_joined: (props:{
        room_id: string,
        room_members: {
            members:  string[],
            colors: string[]
        }
    })=>void;
    room_closed: (props: {
        game_data: {
            players: [],
            scores: []
        }
    })=>void;
    vote_result: (props: {
        player_correct: boolean,
        impostor_found: boolean,
        score_data: {
            players: string[],
            scores: number[]
        }
    })=>void;
    player_exited: (props: {
        player_id: string
    })=>void;
    guess_result: (props:{
        guess_result: boolean,
        impostor_id: string,
        scores: {
            players: string[],
            scores: number[]
        }
    })=>void;
    initiate_voting: (props: {
        player_data: string[],
    })=>void;
    check_consent: (props: {
        player_data: string[]
    })=>void;
}

//Declare the socket

const socketUrl = import.meta.env.VITE_SOCKET_URL
    ?? (import.meta.env.VITE_SOCKET_SMOKE_TEST === 'true' ? 'http://localhost:5051' : import.meta.env.BASE_URL);

export const socket:Socket<ServerToClientEvents, ClientToServerEvents> = io(socketUrl,{
    autoConnect: false,
    transports: ['websocket']
});

export function connectSocket(){
    socket.connect();
}

//Declare the outgoing socket messages

type SocketAction<EventName extends keyof ClientToServerEvents> = (
    ...args: Parameters<ClientToServerEvents[EventName]>
) => void;

type SocketActionMap = {
    startRoom: SocketAction<'start_room'>;
    startGame: SocketAction<'start_game'>;
    joinRoom: SocketAction<'join_room'>;
    exitRoom: SocketAction<'exit_room'>;
    closeRoom: SocketAction<'close_room'>;
    initiateVotingConsent: SocketAction<'initiate_voting_consent'>;
    guessWord: SocketAction<'guess_word'>;
    consentResponse: SocketAction<'consent_response'>;
    scoreUpdates: SocketAction<'score_updates'>;
};

export const SocketActions: SocketActionMap = {
    startRoom: (props)=>{
        socket.emit('start_room',props);
    },
    startGame: (props)=>{
        socket.emit('start_game',props);
    },
    joinRoom: (props)=>{
        socket.emit('join_room',props);
    },
    exitRoom: (props)=>{
        socket.emit('exit_room',props);
    },
    closeRoom: (props)=>{
        socket.emit('close_room',props);
    },
    initiateVotingConsent: (props)=>{
        socket.emit('initiate_voting_consent',props);
    },
    guessWord: (props)=>{
        socket.emit('guess_word',props);
    },
    consentResponse: ()=>{
        socket.emit('consent_response');
    },
    scoreUpdates: (props)=>{
        socket.emit('score_updates',props);
    }
}

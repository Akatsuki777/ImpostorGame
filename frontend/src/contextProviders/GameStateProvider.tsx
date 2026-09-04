import { createContext, useCallback, useReducer } from "react"
import type { Player } from "../types/global"
import { useSocketEvent } from "../api/sockets/useSocketEvent"
import { deepMerge } from "../helpers/utils"

export type GameStateType = {
    gameLayout: 'unjoined' | 'lobby' | 'ingame',
    gamePhase: 'playing' | 'votingConsent' | 'voting' | 'roundResult' | 'gameResult' | 'idle',
    playerVoted: boolean,
    secret: string | null,
    players: Player[]
}

export type GameActionType = {
    type: 'MODIFY'|'RESET',
    state: Partial<GameStateType>
}

const initialState: GameStateType = {
    gameLayout: 'unjoined',
    gamePhase: 'idle',
    playerVoted: false,
    secret: null,
    players: []
}

const GameStateContext = createContext<GameStateType | null>(initialState);

function reducer(state:GameStateType,action:GameActionType):GameStateType{

    switch (action.type){
        case 'MODIFY':
            return deepMerge(action.state,state) as GameStateType;
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

export default function GameStateProvider({children}:{children:React.ReactNode}){

    const [gameState,dispatch] = useReducer(reducer, initialState);

    const handleGameEvent = useCallback((action:GameActionType)=>{
        dispatch(action);
    },[])

    useSocketEvent('game_event',handleGameEvent);

    return (
        <GameStateContext.Provider value={gameState}>
            {children}
        </GameStateContext.Provider>
    );

}

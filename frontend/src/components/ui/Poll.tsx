import { useState } from "react";
import type { Player } from "../../types/global"
import StylizedType from "./StylizedType";
import Button from "./Button";

export type PollProps = {
    players: Player[],
    onPollEnd: (index:Number) => void
}

type PlayerCardProps = Player & {
    className?: String,
    onClick?: ()=>void;
}

export default function Poll({
    players= [],
    onPollEnd=()=>{}
}: PollProps){

    const [activeIndex,setActiveIndex] = useState<Number>(-1);

    const pollDoneClick = (choice:Number) =>{
        onPollEnd(choice);
    }

    return (
        <div className={`w-11/12 min-h-25 h-fit`}>
            <StylizedType className={`mx-auto w-1/2 text-center m-2 text-4xl`}>Vote</StylizedType>
            {
                players.map((player)=>
                    <PlayerCards
                        key={player.playerIndex.toString()}
                        playerIndex={player.playerIndex}
                        playerColor={player.playerColor}
                        playerName={player.playerName}
                        className = {player.playerIndex==activeIndex?'border-blue-500 shadow-[0px_0px_7px_rgba(0,180,216,0.8)]':'border-game-border-gray'}
                        onClick={()=>{
                            setActiveIndex(player.playerIndex);
                        }}
                    ></PlayerCards>
                )
            }
            <Button className={`my-2.5 mx-auto text-2xl border-game-border-gray`} backgroundColor="bg-game-green" textColor="text-white" onClick={()=>{pollDoneClick(activeIndex)}}>SUBMIT VOTE</Button>
        </div>
    );

}

export function PlayerCards(
    {
        playerColor='',
        playerName='',
        className='',
        onClick=()=>{}
    }: PlayerCardProps
){
    return (
        <div onClick={onClick} className={`transition bg-[#F3F3F3] duration-300 cursor-pointer flex items-center justify-between w-75 h-18 mx-auto rounded-full border  ${className} my-1.5`}>
            <div className={`h-16.25 aspect-square rounded-full ${playerColor} ml-[4.5px]`}></div>
            <p className={`w-58.75 text-xl text-center text-game-gray`}>{playerName}</p>
        </div>
    );
}

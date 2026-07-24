import type { Player } from "../../types/global"
import crown from '../../assets/crown_gold.svg'
import StylizedType from "./StylizedType"
import Button from "./Button"

export type ScoreContainerProps = {
    players: ScoreCardProps[]
    onClick: () => void
}

export type ScoreCardProps = Player &{
    isHighest?:Boolean
}

export default function ScoreContainer({
    players=[],
    onClick=()=>{}
}:ScoreContainerProps){
    
    const sortedPlayers = [...players].sort((a,b) => (b.playerScore ?? 0) - (a.playerScore ?? 0));

    let highScore: number = sortedPlayers[0].playerScore ?? 0;

    sortedPlayers.forEach((item)=>{

        if(item.playerScore && item.playerScore > 0 && item.playerScore >= highScore){
            item.isHighest = true;
        }

        highScore = item.playerScore ?? 0;
    });

    return (
        <div className={`w-full h-fit grid grid-cols-1 gap-2 justify-items-center`}>
            {
                players.length>0 && sortedPlayers.map((player)=>
                    <ScoreCard
                        key={player.playerName+player.playerScore?.toString()}
                        isHighest={player.isHighest}
                        playerName={player.playerName}
                        playerColor={player.playerColor}
                        playerScore={player.playerScore}
                    ></ScoreCard>
                )
            }
            <Button
                className={`text-xl font-light`}
                backgroundColor={`bg-game-rose`}
                textColor={`text-white`}
                onClick={onClick}
            > CLOSE
            </Button>
        </div>
    );

} 

function ScoreCard({
    playerName='',
    playerColor='bg-gray-100',
    playerScore=0,
    isHighest=false
}:ScoreCardProps){

    return (
        <div className={`w-75 h-18 rounded-xl bg-white border border-gray-950 flex items-center justify-between`}>
            <div className={`w-7.5 h-7.5 rounded-full ${playerColor} ml-10`}></div>
            <div className={`flex justify-center items-center`}>
                {isHighest&&<img src={crown} alt={`Crown`} className={`w-7.5 h-7.5`}></img>}
                <p className={`text-game-gray text-xl text-center`}>{playerName}</p>
            </div>
            <StylizedType children={playerScore.toString()} className={`w-8 h-8 text-xl mr-2.5 text-game-rose`}></StylizedType>
        </div>
    );

}
import type { Ref } from "react";
import StylizedType from "./StylizedType";

export type ScoreElementProps = {
    scoreVal?: string,
    ref: Ref<HTMLParagraphElement>
}

export default function ScoreElement({scoreVal="0", ref}:ScoreElementProps){
    
    return (
        <div className={`flex`}>
            <StylizedType 
                children={`SCORE`}
            >
            </StylizedType>
            <StylizedType 
            className={`text-game-rose ml-4`}
            ref={ref}
            children={scoreVal}
            >
            </StylizedType>
        </div>
    );
}
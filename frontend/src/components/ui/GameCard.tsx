import { useEffect, useState } from 'react';
import impostor from '../../assets/impostor.webp'
import StylizedType from './StylizedType';

type GameCardProps = {
    cardImage?: string
    cardName?: string
}

export default function GameCard({
    cardImage=impostor,
    cardName='Impostor'
}:GameCardProps){

    const [isIncoming,setIsIncoming] = useState(true);

    const imgAnimIn = '-rotate-12 -translate-x-full opacity-0';
    const textAnimIn = '-translate-x-full';

    const imgAnimOut = 'translate-3d translate-z-20 opacity-0';
    const textAnimOut = 'translate-x-full';

    useEffect(()=>{
        setIsIncoming(false);
    },[]);

    return (
        <div className={`flex w-9/12 aspect-880/1200 flex-col justify-center items-center`}>
            <img className={`origin-bottom-left duration-300 ${isIncoming?imgAnimIn:''} transition-all w-10/12 aspect-880/1200 mb-2 rounded-4xl border-solid border-gray-700 border`} src={`${cardImage}`}/>
            <StylizedType
                className={`transition-all duration-400 ${isIncoming?textAnimIn:''} text-gray-950 text-4xl `}
                children={`${cardName}`}
            ></StylizedType>
        </div>
    );

}
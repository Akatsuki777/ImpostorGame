//TBD: Build a complete messaging system frontend that is triggered on message button click

import { useState } from "react";
import messageIcon from '../../assets/message_icon.webp'

export default function MessageButton(){

    const [isNotify,setIsNotify] = useState<boolean>(false);

    function handleMessageButtonClick(){
        setIsNotify(!isNotify);
    }


    return (
        <div onClick={handleMessageButtonClick} className={`w-12 h-12 rounded-full bg-game-light-gray hover:shadow-[0px_0px_4px_rgba(0,0,0)] active:shadow-[0px_0px_2px_rgba(0,0,0)] select-none`}>
            <div className={`w-2.5 h-2.5 ml-10`}>
                <div className={`transition w-full h-full duration-75 bg-game-red rounded-full ${isNotify?'scale-100':'scale-0'}`}></div>
            </div>
            <img
                className={`w-8 h-8 mx-auto`}
                src={messageIcon}
                alt='Message Icon Logo'
            >
            </img>
        </div>
    );

}
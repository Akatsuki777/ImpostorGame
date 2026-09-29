import Button from "./Button";
import Input from "./Input";

type RoomContainerProps = {
    isInRoom?: Boolean,
    className?: string,
    roomID?: string,
    onChangeAction?: (value:string)=>void
}

export default function RoomContainer({
    isInRoom = false,
    className = '',
    roomID,
    onChangeAction=(value:string)=>{}
}: RoomContainerProps){

    return (
        <div className={`${className} w-68.75 h-32.5 rounded-3xl flex flex-col items-center justify-center border bg-white border-black`}>
            <p className={' mb-5 text-2xl text-black'}>ROOM ID</p>
            {!isInRoom?<Input placeholder="ENTER ROOM ID" className={`text-roboto font-light text-2xl`} onChange={(e)=>onChangeAction(e.currentTarget.value)} isCaps={true} characterLimit={5}></Input>:<Button children={roomID} className={`font-roboto font-light text-2xl`} backgroundColor='bg-game-rose' textColor="text-white" disabled></Button>}
        </div>
    );

}
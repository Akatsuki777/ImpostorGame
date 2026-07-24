import Button from "./Button";
import Input from "./Input";

type RoomContainerProps = {
    isRoomOwner?: Boolean,
    className?: string,
    roomID?: string
}

export default function RoomContainer({
    isRoomOwner = false,
    className = '',
    roomID
}: RoomContainerProps){

    return (
        <div className={`${className} w-68.75 h-32.5 rounded-3xl flex flex-col items-center justify-center border bg-white border-black`}>
            <p className={' mb-5 text-2xl text-black'}>ROOM ID</p>
            {!isRoomOwner?<Input placeholder="ENTER ROOM ID"></Input>:<Button children={roomID} backgroundColor='bg-game-rose' textColor="text-white" noClick={true}></Button>}
        </div>
    );

}
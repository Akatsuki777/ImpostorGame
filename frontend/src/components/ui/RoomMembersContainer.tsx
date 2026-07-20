import { useState } from "react";
import closeBtn from "../../assets/cross_button.svg";

export type RoomMemberProps = {
    id: string,
    username: string,
    color: string
}

export type RoomMemberContainerProps = {
    users?: RoomMemberProps[],
    onUserRemove?:()=>void
}

type RoomMemberElProps = RoomMemberProps & {
    onRemove: (memberId: string) => void
}

export default function RoomMembersContainer({ 
    users = [],
    onUserRemove
}:RoomMemberContainerProps){

    const ids = users.map((user)=>user.id);
    const uniqueIds = new Set(ids);

    if(ids.length !== uniqueIds.size){
        throw new Error(`Each room member must have unique ids!`);
    }

    const [roomMembers, setRoomMembers] = useState(users);

    function onRemove(memberId:string){
        setRoomMembers((prev)=>
            prev.filter((member)=>member.id!==memberId)
        );
        onUserRemove?.();
    }

    return (
        <div className={`w-11/12 aspect-square border-t border-b overflow-hidden`}>
            <div className={`w-full h-full overflow-scroll grid grid-cols-[repeat(3,1fr)] auto-rows-min gap-4 p-2.5 place-items-center`}>
               {
                roomMembers.map((member)=>
                    <RoomMemberEl
                        key={member.id}
                        id={member.id}
                        color={member.color}
                        username={member.username}
                        onRemove={onRemove}
                    >
                    </RoomMemberEl>
                )
               }
            </div>
        </div>
    );

}

function RoomMemberEl({
    id="",
    username="",
    color="bg-white",
    onRemove
}:RoomMemberElProps){

    return (
        <div className={`transition duration-150 w-full aspect-square rounded-md shadow-[0px_0px_2px_#000] hover:shadow-[0px_0px_4px_#000]`}>
            <img
                className={`w-2 h-2 hover:bg-gray-200 active:bg-gray-600 transition duration-150 rounded-full mt-[2%] ml-[calc(98%-8px)]`}
                src={closeBtn}
                alt="Close Button"
                onClick={() => onRemove(id)}
            ></img>
            <div
                className={`w-2/3 aspect-square rounded-full ${color} mx-auto`}
            ></div>
            <p className={`w-10/12 wrap-break-word text-center mx-auto mt-0.5`}>
                {username}
            </p>
        </div>
    );

}

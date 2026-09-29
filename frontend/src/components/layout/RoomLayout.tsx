import { AnimatePresence, motion } from "motion/react";
import { useGameState } from "../../contextProviders/GameStateProvider";
import BaseLayout from "./BaseLayout";
import ShapesHeader from "../ui/ShapesHeader";
import { delayVariant, translateVariant } from "../../global/AnimateVariables";
import StylizedType from "../ui/StylizedType";
import RoomContainer from "../ui/RoomContainer";
import RoomMembersContainer from "../ui/RoomMembersContainer";
import { useCallback, useState } from "react";
import { SocketActions } from "../../api/sockets/SocketClient";
import Button from "../ui/Button";


export default function RoomLayout(){

    const [roomId, setRoomId] = useState<string>('');

    const gameStates = useGameState();

    const removePlayer = useCallback((playerID: string)=>{
        SocketActions.removePlayers({player_ids: [playerID]});
    },[])

    const exitRoom = useCallback((isRoomOwner:boolean )=>{
        if (isRoomOwner){
            SocketActions.closeRoom({room_id:gameStates?.roomId??""});
        } else {
            SocketActions.exitRoom({room_id: gameStates?.roomId??""});
        }
    },[gameStates?.roomId]);

    const joinRoom = useCallback((player_id: string)=>{
        SocketActions.joinRoom({
            room_id: roomId??"",
            player_id: player_id
        });
    },[roomId]);

    const startGame = useCallback((roomId: string)=>{
        SocketActions.startGame({
            room_id: roomId
        });
    },[])

    return (
        <BaseLayout>
            <AnimatePresence>
                <motion.div
                    className={`flex h-full w-full flex-col items-center`}
                    variants={delayVariant}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <motion.div 
                        layout
                        variants={translateVariant}
                        className="[@media(max-height:500px)]:hidden">
                        <ShapesHeader></ShapesHeader>
                    </motion.div>
                    <motion.div
                        layout
                        variants={translateVariant}
                    >
                        <StylizedType className={`text-5xl [@media(max-height:500px)]:text-3xl my-3`}>IMPOSTOR</StylizedType>
                    </motion.div>
                    <motion.div
                        layout
                        variants={translateVariant}
                    >
                        <RoomContainer
                            isInRoom={gameStates?.roomId?true:false}
                            roomID={gameStates?.roomId??""}
                            onChangeAction={setRoomId}
                        >
                        </RoomContainer>
                    </motion.div>
                    <motion.div
                        layout
                        variants={translateVariant}
                        className={`my-3`}
                    >
                        {
                            gameStates?.roomId && (
                                <RoomMembersContainer
                                    isOwnerView={gameStates.isRoomOwner}
                                    users={gameStates.players}
                                    onUserRemove={removePlayer}
                                >
                                </RoomMembersContainer>
                            )
                        }
                    </motion.div>
                    <motion.div>
                        {
                            !gameStates?.isRoomOwner && !gameStates?.roomId && (
                                <Button
                                    backgroundColor={`bg-game-turquoise`}
                                    textColor={`text-white`}
                                    onClick={()=>{joinRoom(gameStates?.players[0].playerID??"")}}
                                >
                                    ENTER ROOM
                                </Button>
                            )
                            
                        }
                        {
                            gameStates?.isRoomOwner && (
                                <Button
                                    backgroundColor={`bg-game-green`}
                                    textColor={`text-white`}
                                    onClick={()=>{startGame(gameStates?.roomId??"")}}
                                >
                                    START GAME
                                </Button>
                            )
                        }
                    </motion.div>
                    <motion.div>
                        {
                            gameStates?.roomId && (
                                <motion.div
                                    layout
                                    variants={translateVariant}
                                    className={`my-3`}
                                >
                                    <Button
                                        backgroundColor={`bg-game-red`}
                                        textColor={`text-white`}
                                        onClick={()=>{exitRoom(gameStates?.isRoomOwner??false);}}
                                    >
                                        {
                                            gameStates?.isRoomOwner?"CLOSE ROOM":"EXIT ROOM"
                                        }
                                    </Button>
                                </motion.div>
                            )
                        }
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </BaseLayout>
    );

}

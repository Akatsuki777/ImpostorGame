import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ImpostorTitleImg from "../ui/ImpostorEl";
import ShapesHeader from "../ui/ShapesHeader";
import StylizedType from "../ui/StylizedType";
import BaseLayout from "./BaseLayout";
import { delayVariant, translateVariant } from "../../global/AnimateVariables";
import Button from "../ui/Button";
import AuthLayout from "./AuthLayout";
import { SocketActions } from "../../api/sockets/SocketClient";
import { useAuth } from "../../contextProviders/AuthProvider";


type Screen = "home" | "register" | "login";

export default function HomeLayout(){
    const [screen, setScreen] = useState<Screen>("home");
    const auth = useAuth();
    
    const isLoggedIn: boolean = auth?.user?true:false;
    const showAuthButtons = !isLoggedIn && screen === "home";

    const loadRoom = useCallback((isOwner:boolean)=>{

        SocketActions.getRoom(isOwner);

    },[])

    return (
        <BaseLayout className="flex flex-col items-center ">
            <AnimatePresence>
               <motion.div
                className="flex h-full w-full flex-col items-center"
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
                        className="h-1/2 my-4">
                        <ImpostorTitleImg></ImpostorTitleImg>
                    </motion.div>
                    <motion.div
                        layout
                        variants={translateVariant}
                    >
                        <StylizedType className={`text-5xl [@media(max-height:500px)]:text-3xl`}>IMPOSTOR</StylizedType>
                    </motion.div>
                    <AnimatePresence mode="wait">
                        {showAuthButtons && (
                            <motion.div
                                key="auth-buttons"
                                layout
                                variants={delayVariant}
                                className="mt-4"
                            >
                                <motion.div
                                    variants={translateVariant}
                                >
                                    <Button
                                        backgroundColor="bg-game-black"
                                        textColor="text-white"
                                        className="mb-1"
                                        onClick={() => setScreen("register")}
                                    >
                                        REGISTER
                                    </Button>
                                </motion.div>
                                <motion.div
                                    variants={translateVariant}
                                >
                                    <Button
                                        backgroundColor="bg-game-green"
                                        onClick={() => setScreen("login")}
                                    >
                                        LOG IN
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}
                        {!isLoggedIn && screen !== "home" && (
                            <motion.div
                                key={screen}
                                layout
                                variants={translateVariant}
                                className="mt-4"
                            >
                                <AuthLayout 
                                    authType={screen} 
                                    onClickBack={() => setScreen("home")}
                                />
                            </motion.div>
                        )}
                        {isLoggedIn && (
                            <motion.div
                                key={screen}
                                layout
                                variants={translateVariant}
                                className="mt-4"
                            >
                                <Button className={`my-2`} backgroundColor="bg-game-green" onClick={()=>{loadRoom(true)}}>START ROOM</Button>
                                <Button textColor="text-white" backgroundColor="bg-game-black" onClick={()=>{loadRoom(false)}}>JOIN ROOM</Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div> 
            </AnimatePresence>
        </BaseLayout>
    );
}

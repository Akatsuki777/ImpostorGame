import {AnimatePresence, motion} from "motion/react"
import { delayVariant, translateVariant } from "../../global/AnimateVariables";
import Input from "../ui/Input";
import Button from "../ui/Button";
import backButton from "../../assets/backButton.svg";
import { useAuth } from "../../contextProviders/AuthProvider";
import { useCallback, useState } from "react";
import { useToast } from "../../features/toast/ToastContext";

export type AuthProps = {
    authType?: 'register' | 'login'
    onClickBack: ()=>void
}

type AuthValProps = {
    username: string
    password: string
}


export default function AuthLayout({
    authType='register',
    onClickBack=()=>{}
}:AuthProps){

    const auth = useAuth();
    const toast = useToast();

    const [credentials, setCredentials] = useState<Record<string,string>>({'username':'','password':''});

    const updateCredentials = useCallback((isUsername:boolean, value:string)=>{

        const key = isUsername?'username':'password';

        setCredentials((prev)=>({
            ...prev, 
            [key]:value
        }));

    },[]);

    const validate = useCallback(()=>{

        if (credentials['username'].trim() === '' || credentials['username'].length<3){
            toast?.addToast({
                toastType: 'error',
                message: `The username shouldn't be empty nor less than 3 characters!`,
                expirationTime: 2
            });
            return false;
        }

        if (credentials['password'].trim() === '' || credentials['password'].length<8 || !/[*,@!#$&_.]/.test(credentials['password'])){
            toast?.addToast({
                toastType: 'error',
                message: `The password should contain a special characters and must be minimum 8 characters`,
                expirationTime: 2
            })
            return false;
        }

        return true;
    },[credentials, toast]);

    const authenticate = useCallback((isLogin:boolean)=>{

        if (!validate()){
            return;
        }

        if(isLogin){
            auth?.login(credentials['username'],credentials['password']);
        } else {
            auth?.register(credentials['username'],credentials['password']);
        }

    },[validate, credentials, auth]);

    return (
        <AnimatePresence>
            <form onSubmit={(event) => {
                event.preventDefault();
                authenticate(authType !== "register");
            }}>
                <motion.div
                    variants={delayVariant}
                >
                    <motion.div
                        variants={translateVariant}
                        className={'my-1'}
                    >
                        <Input
                            placeholder={'USERNAME'}
                            inputType={'text'}
                            onChange={(e)=>{updateCredentials(true,e.currentTarget.value)}}
                        ></Input>
                    </motion.div>
                    <motion.div
                        variants={translateVariant}
                        className={'my-1'}
                    >
                        <Input
                            placeholder={'**********'}
                            inputType={'password'}
                            onChange={(e)=>{updateCredentials(false,e.currentTarget.value)}}
                        ></Input>
                    </motion.div>
                    <motion.div
                        variants={translateVariant}
                        className={'w-59 flex justify-between'}
                    >
                        <Button 
                            isImage={true}
                            aria-label="Back"
                            buttonWidth={'w-12.5'}
                            imageSrc= {backButton}
                            backgroundColor="bg-game-black"
                            onClick={()=>onClickBack()}
                        >
                            BACK
                        </Button>
                        <Button 
                            type="submit" 
                            backgroundColor="bg-game-green"
                            buttonWidth={'w-40'}
                            disabled={auth?.isLoading}
                        >
                            
                            {authType === "register" ? "REGISTER" : "LOG IN"}
                        </Button>
                    </motion.div>
                </motion.div>
            </form>
        </AnimatePresence>
    );

}

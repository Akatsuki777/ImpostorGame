import { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as authApi from '../api/auth/authAPI';
import { useToast } from "../features/toast/ToastContext";

type authContextType = {
    user: string | null ;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string) => Promise<void>;
    me: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthStateContext = createContext<authContextType | null>(null);

export function AuthStateProvider({children}:{children:React.ReactNode}){

    const toast = useToast();

    const [user,setUser] = useState<string|null>(null);
    const [isLoading,setLoading] = useState<boolean>(true);

    const me = useCallback(async ()=>{

        setLoading(true);

        try {

            const username = await authApi.me();
            setUser(username);
            toast?.addToast({
                toastType: 'success',
                message: 'Successfully set the session',
                expirationTime: 2
            })
        } catch (error){
            toast?.addToast({
                toastType: 'error',
                message: error instanceof Error ? error.message : "Not Logged In",
                expirationTime: 2,
            }); 
        }

        setLoading(false);

    },[toast]);


    const login = useCallback(async (username: string, password: string)=>{
        
        setLoading(true);

        let isLoggedIn = false;

        try{
            await authApi.login(username,password);
            toast?.addToast({
                toastType: 'success',
                message: 'Successfully logged in',
                expirationTime: 2
            })
            isLoggedIn = true;
        } catch (error){
            toast?.addToast({
                toastType: 'error',
                message: error instanceof Error ? error.message : "Unable to login",
                expirationTime: 2,
            });
        }
        if(isLoggedIn){
            await me();
        }

        setLoading(false);

    },[toast, me]);

    const register = useCallback(async (username: string, password: string)=>{

        setLoading(true);

        try{
            await authApi.register(username,password);
            toast?.addToast({
                toastType: 'success',
                message: "Successfully Registered!",
                expirationTime: 2
            })
        } catch (error){
           toast?.addToast({
                toastType: 'error',
                message: error instanceof Error ? error.message : "Unable to register",
                expirationTime: 2,
            }); 
        }

        setLoading(false);

    },[toast]);

    const logout = useCallback(async ()=>{

        setLoading(true);
        
        try {
            await authApi.logout();
            toast?.addToast({
                toastType: 'success',
                message: 'Successfully logged out!',
                expirationTime: 2
            });
            setUser(null);
        } catch (error){
            toast?.addToast({
                toastType: 'error',
                message: error instanceof Error ? error.message : 'Unable to logout',
                expirationTime: 2
            });
        }

        setLoading(false);

    },[toast]);

    useEffect(()=>{
        let cancelled = false;

        async function restoreSession(){
            try{
                const username = await authApi.me();
                if (!cancelled) setUser(username);
            } catch {
                if(!cancelled) setUser(null);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        void restoreSession();

        return ()=>{
            cancelled = true;
        };

    },[]);

    return (
        <AuthStateContext.Provider value={{user,isLoading,login,register,logout,me}}>
            {children}
        </AuthStateContext.Provider>
    );

}

export function useAuth(){

    const auth = useContext(AuthStateContext);

    if(!auth){
        console.error("Must be used within the auth context");
    }

    return auth;

}
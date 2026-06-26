import { createContext, useCallback, useContext, useState } from "react";
import type { AddToastProps, ToastItem } from "./ToastTypes"
import ToastContainer from "./ToastContainer";


type ToastContextType = {
    addToast: (addToastProps:AddToastProps) => void;
    removeToast: (id:string)=>void;
    clearToasts: ()=>void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export default function ToastProvider({children}:{children: React.ReactNode}){

    const [toasts,setToasts] = useState<ToastItem[]>([]);


    const removeToast = useCallback((id: string)=>{
        setToasts((prev)=>prev.map((toast)=>toast.id===id?{...toast,isLeaving:true}:toast));
        setTimeout(()=>{
            setToasts((prev)=>prev.filter((toast)=>toast.id !== id));
        },100);
    },[]);

    const addToast = useCallback(({toastType='info',message='Sample Message',expirationTime=1}:AddToastProps)=>{
        const Toast : ToastItem = {
            id: crypto.randomUUID(),
            message: message,
            toastType: toastType,
            expirationTime: expirationTime,
            isLeaving: false
        } 

        setToasts((prev)=>[Toast,...prev]);

        setTimeout(()=>{
            removeToast(Toast.id);
        },expirationTime*1000)

    },[]);

    const clearToasts = useCallback(()=>{
        setToasts([]);
    },[])

    return (
        <ToastContext.Provider value={{addToast, removeToast, clearToasts}}>
            <ToastContainer
                toastItems={toasts}
                onRemove={removeToast}
            >
            </ToastContainer>
            {children}
        </ToastContext.Provider>
    )

}

export function useToast(){

    const toast = useContext(ToastContext);

    if (!toast){
        console.error("Must be used within toast context");
    }

    return toast;

}
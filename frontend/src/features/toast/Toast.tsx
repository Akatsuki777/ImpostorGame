import error from '../../assets/error.svg';
import success from '../../assets/success.svg';
import info from '../../assets/info.svg'
import { useEffect, useState } from 'react';

type ToastProps = {
    id: string,
    toastType: 'success'|'error'|'info',
    message: string,
    onRemove: (id:string)=>void
}

export default function Toast({id,toastType,message,onRemove}:ToastProps){

    const [isVisible,setIsVisible] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setIsVisible(true);
        },20);
    })

    const toastVals = {
        'success': {
            bg: 'bg-green-200/70',
            color: 'text-green-950',
            icn: success
        },
        'error': {
            bg: 'bg-red-200/70',
            color: 'text-red-950',
            icn: error
        },
        'info': {
            bg: 'bg-blue-200/70',
            color: 'text-blue-950',
            icn: info
        }
    };

    return(
        <div className={`${isVisible==false?"-translate-y-2.5":"translate-y-0"} ${toastVals[toastType].bg} w-full h-6.25 cursor-pointer flex items-center justify-between rounded-full transition-all`}>
            <img className={`w-5 h-5 ml-1.5`} src={`${toastVals[toastType].icn}`}/>
            <p className={`text-left text-[12px] ${toastVals[toastType].color}`}>{message}</p>
            <img className={`w-5 h-5 mr-1.5`} src={`${error}`} onClick={()=>{onRemove(id)}}/>
        </div>
    );

}
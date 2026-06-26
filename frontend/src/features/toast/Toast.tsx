import error from '../../assets/error.svg';
import success from '../../assets/success.svg';
import info from '../../assets/info.svg'
import { useEffect, useState } from 'react';
import close_b from '../../assets/close_b.svg';
import close_r from '../../assets/close_r.svg';
import close_g from '../../assets/close_g.svg';

type ToastProps = {
    id: string,
    toastType: 'success'|'error'|'info',
    message: string,
    onRemove: (id:string)=>void,
    className: string
}

export default function Toast({id,toastType,message,onRemove,className=''}:ToastProps){

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
            icn: success,
            close: close_g
        },
        'error': {
            bg: 'bg-red-200/70',
            color: 'text-red-950',
            icn: error,
            close: close_r
        },
        'info': {
            bg: 'bg-blue-200/70',
            color: 'text-blue-950',
            icn: info,
            close: close_b
        }
    };

    return(
        <div className={`${className} ${!isVisible?"-translate-y-2.5":"translate-y-0"} ${toastVals[toastType].bg} w-full h-6.25 cursor-pointer flex items-center justify-between rounded-full transition-all`}>
            <img className={`w-5 h-5 ml-1.5`} src={`${toastVals[toastType].icn}`}/>
            <p className={`text-left text-[12px] ${toastVals[toastType].color}`}>{message}</p>
            <img className={`w-4 h-4 mr-1.5`} src={`${toastVals[toastType].close}`} onClick={()=>{onRemove(id)}}/>
        </div>
    );

}
import { useEffect, useRef, useState } from 'react';
import closeBtn from '../../assets/cross_button.svg'
export type ModalProps = {
    modalContent?: React.ReactElement,
    onClose?: () => void
}

export default function Modal({
    modalContent=<div></div>,
    onClose=()=>{}
}:ModalProps){

    const [isRemove,setIsRemove] = useState<boolean>(false);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        function handleOutsideClick(event:Event){
            if(event.target instanceof Node && modalRef.current && !modalRef.current.contains(event.target)){
                closeModal();
            }
        }

        document.addEventListener('pointerdown',handleOutsideClick);

        return () =>{
            document.removeEventListener('pointerdown',handleOutsideClick);
        }
    },[]);

    function closeModal(){
        setIsRemove(true);
        setTimeout(()=>{
            onClose();
        },150);
    }


    return(
        <div ref={modalRef} className={`transition-opacity duration-150 ease-in w-11/12 min-h-50 h-fit rounded-md border absolute bg-white left-[4.16%] top-2 ${isRemove?'opacity-0':''} z-100`}>
            <img
                className={`w-2 h-2 hover:bg-gray-200 active:bg-gray-600 transition duration-150 rounded-full mt-[2%] ml-[calc(98%-8px)]`}
                src={closeBtn}
                alt="Close Button"
                onClick={() => closeModal()}
            ></img>
            {modalContent}
        </div>
    );

}
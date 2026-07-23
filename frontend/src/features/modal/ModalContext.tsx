import { createContext, useCallback, useContext, useState } from "react";
import type { ModalProps } from "./Modal"
import Modal from "./Modal";

export type ModalContextType = {
    addModal: (modalProps:ModalProps)=> void;
    removeModal: ()=>void;
}

export type ModalProviderProps = {
    isModal?: boolean,
    modalProps?: ModalProps
}

const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({children}:{children:React.ReactNode}){
    const [isModalPresent,setIsModalPresent] = useState<boolean>(false);
    const [modalContent,setModalContent] = useState<ModalProps>({});

    const addModal = useCallback((modalProps:ModalProps)=>{
        setModalContent(modalProps);
        setIsModalPresent(true);
    },[])

    const removeModal = useCallback(()=>{
        setIsModalPresent(false);
    },[]);

    const closeModal = useCallback(()=>{
        modalContent.onClose?.();
        removeModal();
    },[modalContent, removeModal]);

    return (
        <ModalContext.Provider value={{addModal,removeModal}}>
            {
                isModalPresent && <Modal
                    modalContent={modalContent.modalContent}
                    onClose={closeModal}
                >

                </Modal>
            }
            {children}
        </ModalContext.Provider>
    );
}

export function useModal(){

    const modal = useContext(ModalContext);

    if(!modal){
        console.error("Must be used within modal context");
    }

    return modal;
    
}

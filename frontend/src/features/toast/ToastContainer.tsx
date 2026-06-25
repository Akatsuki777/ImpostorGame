import Toast from "./Toast";
import type { ToastItem } from "./ToastTypes";

type ToastContainerProps = {
    toastItems: ToastItem[]
    onRemove: (id:string)=>void
}

export default function ToastContainer({
    toastItems = [],
    onRemove
}:ToastContainerProps){
    
    return (
        <div
            className={`w-87.5 max-w-9/12 min-h-6.25 flex flex-col gap-y-3 max-h-37 overflow-hidden fixed top-3 left-1/2 -translate-x-1/2 z-50`}
        >
            {
               toastItems.map((toast)=>(
                <Toast
                    key={toast.id}
                    id={toast.id}
                    toastType={toast.toastType}
                    message={toast.message}
                    onRemove={onRemove}
                ></Toast>
               )) 
            }
        </div>
    );

}
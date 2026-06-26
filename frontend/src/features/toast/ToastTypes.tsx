export type ToastItem = {
    id: string
    toastType: 'success' | 'error' | 'info'
    message: string
    expirationTime: number 
    isLeaving: Boolean
}

export type AddToastProps = {
    toastType: 'success' | 'error' | 'info'
    message: string
    expirationTime: number 
}
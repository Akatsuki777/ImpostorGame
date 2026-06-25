export type ToastItem = {
    id: string
    toastType: 'success' | 'error' | 'info'
    message: string
    expirationTime: number 
}

export type AddToastProps = {
    toastType: 'success' | 'error' | 'info'
    message: string
    expirationTime: number 
}
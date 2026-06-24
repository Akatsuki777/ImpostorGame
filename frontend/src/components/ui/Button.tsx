type ButtonProps = {
    backgroundColor?: string
    className?: string
    textColor?: string
    onClick?: () => void
    children?: React.ReactNode
}

function Button({
    backgroundColor = 'bg-white',
    textColor = 'text-black',
    className = '',
    onClick = () => {},
    children = 'Click me'
}: ButtonProps) {

    return (
        <div className={`${className} w-59 h-12.5 overflow-hidden`}>
            <div 
                className={`flex justify-center items-center ${backgroundColor} ${textColor} transition-opacity duration-300 rounded-full cursor-pointer w-59 h-12.5 border-[0.45px] border-black`} 
            >
                <p className={`select-none`}>{children}</p>
            </div>
            <div
                className={`relative left-0 -top-12.5 w-59 h-12.5 rounded-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-20 active:opacity-30`}
                onClick={onClick}
            ></div>
        </div>
    )
}

export default Button
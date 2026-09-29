type BaseLayoutProps = {
    children: React.ReactNode,
    className?: string
}

export default function BaseLayout({
    children,
    className = "",
}:BaseLayoutProps){
    return (
        <div
            className= {`w-screen h-dvh overflow-hidden max-w-150 ${className}`}
        >
            <div 
                className="fixed inset-0 z-9999 hidden [@media(orientation:landscape)_and_(max-height:720px)]:flex flex-col items-center justify-center bg-black/95 p-6 text-center select-none"
                aria-modal="true"
                role="dialog"
            >
                <svg
                    className="mb-6 h-24 w-24 animate-pulse text-amber-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path
                        d="M8 21h8c1.097 0 2-.903 2-2V5c0-1.097-.903-2-2-2H8c-1.097 0-2 .903-2 2v14c0 1.097.903 2 2 2Z"
                        strokeWidth="0.5"
                        transform="rotate(90 9.968 10.744) scale(.86047)"
                    />
                    <path
                        d="M18 9V5c0-1.097-.903-2-2-2h-3"
                        strokeWidth="0.5"
                        transform="rotate(90 10.038 12.61) scale(.86047)"
                    />
                    <path
                        className="fill-current stroke-none"
                        d="m20.067 12.468 1.29 1.721h-2.58z"
                        transform="translate(20.067 13.615333) scale(0.8) translate(-20.067 -13.615333)"
                    />
                    <circle
                        cx="12"
                        cy="19"
                        r="1"
                        strokeWidth=".5"
                        transform="rotate(90 10.398 11.174) scale(.86047)"
                    />
                </svg>
                <h2 className="text-xl font-bold">Please Rotate Your Device</h2>
                <p className="text-sm mt-2 text-gray-400">
                This game is designed to be played in portrait mode.
                </p>
            </div>
            {children}
        </div>
    );
}

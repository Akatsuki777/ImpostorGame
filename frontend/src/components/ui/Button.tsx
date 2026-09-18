import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    buttonWidth?: string;
    isImage?: boolean;
    imageSrc?: string;
    backgroundColor?: string;
    textColor?: string;
};

export default function Button({
    buttonWidth = "w-59",
    isImage = false,
    imageSrc,
    backgroundColor = "bg-white",
    textColor = "text-black",
    className = "",
    children = "Click me",
    type = "button",
    disabled = false,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className={`group relative mx-auto flex shrink-0 items-center justify-center
                ${buttonWidth} max-w-59 h-12.5 overflow-hidden rounded-full
                border-[0.45px] border-black p-0 ${backgroundColor} ${textColor}
                cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
                focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-current ${className}`}
        >
            {isImage ? (
                <img src={imageSrc} alt="" className="h-3/5 w-3/5 object-contain" />
            ) : (
                <span className="select-none">{children}</span>
            )}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black opacity-0
                    transition-opacity duration-300
                    group-enabled:group-hover:opacity-20
                    group-enabled:group-active:opacity-30"
            />
        </button>
    );
}

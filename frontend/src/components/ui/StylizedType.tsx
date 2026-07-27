import type { Ref } from "react";

type StylizedTypeProps = {
    children?: React.ReactNode
    className?: string
    ref?: Ref<HTMLParagraphElement>
}

export default function StylizedType({className='',children='',ref}:StylizedTypeProps){
    return(
        <p ref={ref} className={`${className} font-game text-2xl`}>
            {children}
        </p>
    );
}
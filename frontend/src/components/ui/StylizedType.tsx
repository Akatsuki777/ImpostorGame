type StylizedTypeProps = {
    children?: React.ReactNode
    className?: string
}

export default function StylizedType({className='',children=''}:StylizedTypeProps){
    return(
        <p className={`${className} font-game text-2xl`}>
            {children}
        </p>
    );
}
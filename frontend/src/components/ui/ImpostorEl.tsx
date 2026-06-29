import impostor_base from '../../assets/impostor_base.webp'

export default function ImpostorTitleImg(){

    return (
        <div className={'w-9/12 aspect-880/1200'}>
            <img
                className={`w-full h-full bg-no-repeat bg-center`}
                src={impostor_base}
                alt='Impostor Image'
            />
        </div>
    );

}
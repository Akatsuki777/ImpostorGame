export default function ShapesHeader() {

    const svgStyle = 'col-start-1 row-start-1 drop-shadow-[4px_4px_0px_#EBEBEB]';

    return (
        <div className={`w-full h-full flex justify-between`}>
            <div className={`my-4 w-20 h-20 -rotate-15`}>
                <svg
                    className={`${svgStyle}`}
                    fill="#FA448C"
                    width="80px"
                    height="80px"
                    viewBox="0 0 50 50"
                    version="1.2"
                    baseProfile="tiny"
                    xmlns="http://www.w3.org/2000/svg"
                    overflow="inherit"
                >
                <path d="M1 1h48v48h-48z" />
                </svg>
                
            </div>
            <div className={`my-0.5 origin-center w-25 h-25 rotate-75`}>
                <svg
                    className={`${svgStyle}`}
                    width="100px"
                    height="100px"
                    fill="#43B5A0"
                    viewBox="0 0 490 490"
                >
                <polygon points="245,456.701 490,33.299 0,33.299 " />
                </svg>
            </div>
            <div className={`origin-center w-28 h-28 rotate-20`}>
                <svg
                    className={`${svgStyle}`}
                    width="110px"
                    height="110px"
                    fill="#491D88"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                <path d="M18.847 22H5.215L.397 9.544 12 1l11.6 8.543z" />
                </svg>
            </div>
            <div className={`origin-center`} >
                <svg
                    className={`${svgStyle}`}
                    width="110px"
                    height="110px"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FEC859"
                    version="1.1"
                    viewBox="0 0 594.39 595.28"
                >
                <path
                    d="M234.39,62.8C234.39,28.14,262.53,0,297.19,0s62.8,28.14,62.8,62.8c17.33-30.02,55.77-40.32,85.79-22.99,30.02,17.33,40.32,55.77,22.99,85.79,30.02-17.33,68.46-7.03,85.79,22.99,17.33,30.02,7.03,68.46-22.99,85.79,34.66,0,62.8,28.14,62.8,62.8s-28.14,62.81-62.8,62.81c30.02,17.33,40.32,55.77,22.99,85.79-17.33,30.02-55.77,40.32-85.79,22.99,17.33,30.02,7.03,68.46-22.99,85.79-30.02,17.33-68.46,7.03-85.79-22.99,0,34.66-28.14,62.8-62.8,62.8s-62.81-28.14-62.81-62.8c-17.33,30.02-55.77,40.32-85.79,22.99-30.02-17.33-40.32-55.77-22.99-85.79-30.02,17.33-68.46,7.03-85.79-22.99-17.33-30.02-7.03-68.46,22.99-85.79-34.66,0-62.8-28.14-62.8-62.81s28.14-62.8,62.8-62.8c-30.02-17.33-40.32-55.77-22.99-85.79,17.33-30.02,55.77-40.32,85.79-22.99-17.33-30.02-7.03-68.46,22.99-85.79,30.02-17.33,68.46-7.03,85.79,22.99Z"
                />
                </svg>
            </div>
        </div>
    );
}

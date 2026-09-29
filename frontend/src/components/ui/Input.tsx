import {useState} from 'react';

type InputProps = {
    inputType?: string
    placeholder?: string
    className?: string
    value?: string
    characterLimit?: number
    isCaps?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input(
    { inputType = 'text', 
        placeholder = 'Enter text...', 
        className = '', 
        value = '',
        characterLimit=0,
        isCaps=false,
        onChange = () => {} }: InputProps
){
    const [placeholderText,setPlaceholderText] = useState(placeholder);
    const [inputValue, setValue] = useState(value);
    const isAtLimit = characterLimit>0?inputValue.length>=characterLimit:false;

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setValue(isCaps?value.toUpperCase():value);
        onChange(e);
    }

    function handleFocus() {
        setPlaceholderText('');
    }
    
    function handleBlur(){
        setPlaceholderText(placeholder);
    }

    return (
        <input
            type={inputType}
            placeholder={placeholderText}
            className={`${className} w-59 h-12.5 rounded-full bg-gray-200 text-center border border-gray-300 ${isAtLimit?'focus:border-game-red focus:text-gray-950 focus:outline-none':'focus:border-blue-500 focus:text-gray-950 focus:outline-none'}`}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            maxLength={characterLimit>0?characterLimit:undefined}
        />
    )
}

export default Input

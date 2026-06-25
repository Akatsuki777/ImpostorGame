import {useState} from 'react';

type InputProps = {
    inputType?: string
    placeholder?: string
    className?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input(
    { inputType = 'text', 
        placeholder = 'Enter text...', 
        className = '', 
        value = '', 
        onChange = () => {} }: InputProps
){
    const [placeholderText,setPlaceholderText] = useState(placeholder);
    const [inputValue, setValue] = useState(value);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
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
            className={`${className} w-59 h-12.5 rounded-full bg-gray-200 text-center border border-gray-300 focus:border-blue-500 focus:text-gray-950 focus:outline-none`}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    )
}

export default Input

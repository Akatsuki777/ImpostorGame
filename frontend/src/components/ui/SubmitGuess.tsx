import { useRef } from "react";
import Button from "./Button";
import Input from "./Input";

export type SubmitGuessProps = {
    onSubmit?: (guess:String)=>void
}

export default function SubmitGuess({
    onSubmit=()=>{}
}:SubmitGuessProps){

    const guessedWord = useRef('');

    const submitGuess = ()=>{
        onSubmit(guessedWord.current)
    }

    return (
        <>
            <div className={`my-2 w-fit mx-auto`}>
                <Input
                inputType= 'text'
                placeholder='GUESS WORD'
                className='font-game text-game-gray'
                onChange={(e)=>{
                    guessedWord.current = e.target.value;
                }}
                ></Input>
            </div>
            <Button
                className={`text-2xl font-light mx-auto my-4`}
                backgroundColor={`bg-game-rose`}
                textColor={`text-white`}
                onClick={submitGuess}
            >
                SUBMIT GUESS
            </Button>
        </>
    );

}
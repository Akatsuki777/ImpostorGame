import { StrictMode, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Button from './components/ui/Button.tsx'
import App from './App.tsx'
import Input from './components/ui/Input.tsx'
import ToastProvider, { useToast } from './features/toast/ToastContext.tsx'
import GameCard from './components/ui/GameCard.tsx'
import RoomContainer from './components/ui/RoomContainer.tsx'
import type { RoomMemberProps } from './components/ui/RoomMembersContainer.tsx'
import RoomMembersContainer from './components/ui/RoomMembersContainer.tsx'
import { useModal } from './features/modal/ModalContext.tsx'
import ModalProvider from './features/modal/ModalContext.tsx'
import type { Player } from './types/global.tsx'
import Poll from './components/ui/Poll.tsx'
import SubmitGuess from './components/ui/SubmitGuess.tsx'
import ScoreContainer, { type ScoreCardProps } from './components/ui/ScoreContainer.tsx'
import ScoreElement from './components/ui/ScoreElement.tsx'

const players:Player[] = [
  {
    playerIndex: 123,
    playerName: 'AJU_JOY',
    playerColor: 'bg-blue-500',
    playerScore: 12
  },{
    playerIndex: 124,
    playerName: 'CHARITHA',
    playerColor: 'bg-green-500',
    playerScore: 20
  },{
    playerIndex: 125,
    playerName: 'PUTTU',
    playerColor: 'bg-red-500',
    playerScore: 15
  }
];

const scoreCardProps:ScoreCardProps[] = players.map(item=>({
  ...item,
  isHighest: false
}));

const roomMembers: RoomMemberProps[] = [
  {
    id:"ABCD",
    username:"AJU_JOY",
    color:"bg-purple-500"
  },
  {
    id:"ABCE",
    username:"CHARITHA",
    color:"bg-green-500"
  },
  {
    id:"ABCF",
    username:"MAMU",
    color:"bg-red-500"
  },
  {
    id:"ABCZ",
    username:"MONU",
    color:"bg-amber-500"
  }  
]

function SampleToastButton() {
  const modal = useModal();
  const toast = useToast();

  return (
    <Button
      className="m-4"
      children="START POLL"
      backgroundColor="bg-red-400"
      textColor="text-white"
      onClick={() => {
        modal?.addModal({modalContent:<Poll
          players={players}
          onPollEnd={(choice)=>{
            modal?.removeModal();
            toast?.addToast(
              {
                toastType:'success',
                message:`The user with id ${choice} was selected`,
                expirationTime:5
              }
            );
          }}
        >
          
        </Poll>,
        onClose:()=>{
          toast?.addToast(
              {
                toastType:'error',
                message:`Poll was closed!`,
                expirationTime:5
              }
            );
        }});
      }}
    />
  );
}

function IncrementingScore(){

  const scoreRef = useRef<HTMLParagraphElement>(null);
  let curScore = 0;

  useEffect(()=>{
    setInterval(()=>{
      curScore++;
      if(scoreRef.current){
        
      }
    },500);
  },[])

  return (
    <ScoreElement
      ref={scoreRef}
    ></ScoreElement>
  );

}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <ToastProvider>
        <SampleToastButton />
        <Input className="m-4" placeholder="******" inputType="password"></Input>
        <div className={`w-150 aspect-880/1200`}>
          <GameCard></GameCard>
          <RoomContainer isRoomOwner={false} roomID='ABCDEF'></RoomContainer>
        </div>
        <RoomMembersContainer
          users={roomMembers}
        ></RoomMembersContainer>
        <SubmitGuess></SubmitGuess>
        <ScoreContainer
          players={scoreCardProps}
          onClick={()=>{}}
        ></ScoreContainer>
        <IncrementingScore></IncrementingScore>
      </ToastProvider>
    </ModalProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Button from './components/ui/Button.tsx'
import App from './App.tsx'
import Input from './components/ui/Input.tsx'
import ToastProvider, { useToast } from './features/toast/ToastContext.tsx'
import type { AddToastProps } from './features/toast/ToastTypes.tsx'
import GameCard from './components/ui/GameCard.tsx'
import RoomContainer from './components/ui/RoomContainer.tsx'
import type { RoomMemberProps } from './components/ui/RoomMembersContainer.tsx'
import RoomMembersContainer from './components/ui/RoomMembersContainer.tsx'
import { useModal } from './features/modal/ModalContext.tsx'
import ModalProvider from './features/modal/ModalContext.tsx'

const toastProps: AddToastProps  = {
  toastType: 'success',
  message: "Sample Message",
  expirationTime: 2
}

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

  return (
    <Button
      className="m-4"
      children="START GAME"
      backgroundColor="bg-red-400"
      textColor="text-white"
      onClick={() => {
        modal?.addModal({modalContent:<>
          <Button></Button>
          <div className={`h-100`}></div>
        </>});
      }}
    />
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
          <RoomContainer isRoomOwner={true} roomID='ABCDEF'></RoomContainer>
        </div>
        <RoomMembersContainer
          users={roomMembers}
        ></RoomMembersContainer>
        <App />

      </ToastProvider>
    </ModalProvider>
  </StrictMode>,
)

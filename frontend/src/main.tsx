import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Button from './components/ui/Button.tsx'
import App from './App.tsx'
import Input from './components/ui/Input.tsx'
import ToastProvider, { useToast } from './features/toast/ToastContext.tsx'
import type { AddToastProps } from './features/toast/ToastTypes.tsx'
import ShapesHeader from './components/ui/ShapesHeader.tsx'
import ImpostorTitleImg from './components/ui/ImpostorEl.tsx'
import StylizedType from './components/ui/StylizedType.tsx'
import GameCard from './components/ui/GameCard.tsx'

const toastProps: AddToastProps  = {
  toastType: 'success',
  message: "Sample Message",
  expirationTime: 2
}

function SampleToastButton() {
  const toast = useToast();

  return (
    <Button
      className="m-4"
      children="START GAME"
      backgroundColor="bg-red-400"
      textColor="text-white"
      onClick={() => {
        toast?.addToast(toastProps);
      }}
    />
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <SampleToastButton />
      <Input className="m-4" placeholder="******" inputType="password"></Input>
      <div className={`w-150 aspect-880/1200`}>
        <GameCard></GameCard>
      </div>
      <App />
    </ToastProvider>
  </StrictMode>,
)

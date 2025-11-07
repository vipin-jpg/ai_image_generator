import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CameraCaptureMain from './CameraCapture/CameraCaptureMain'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CameraCaptureMain />
    </>
  )
}

export default App

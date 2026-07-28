import React from 'react'
import { Home } from './pages/Home'
import { useToast } from './hooks/useToast'
import { ToastContainer } from './components/ui/Toast'

function App() {
  const { toasts, toast, removeToast } = useToast()

  return (
    <>
      <Home toast={toast} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  )
}

export default App

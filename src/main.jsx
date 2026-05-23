import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReactQueryProvider } from './providers/ReactQueryProvider.jsx'
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactQueryProvider>  
      <Toaster richColors position='top-center'/>
      <App />
    </ReactQueryProvider>
  </StrictMode>,
)

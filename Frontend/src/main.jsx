import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { TaskProvider } from './context/TaskContext'
createRoot(document.getElementById('root')).render(
 
    <TaskProvider>
      <App />
    </TaskProvider>
)

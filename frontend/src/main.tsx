/*
  main.tsx - Entry point of the Smart To-Do app

  This is the first file that runs when the app starts.
  It does one thing: finds the HTML element with id "root" 
  in index.html and renders the entire React app inside it.
  
  StrictMode is a React tool that helps find potential bugs
  during development
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

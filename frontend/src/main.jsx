import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

export const serverUrl="http://localhost:8000"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    <Toaster position="bottom-right" />
    <App />
  </Provider>
  </BrowserRouter>
  
)

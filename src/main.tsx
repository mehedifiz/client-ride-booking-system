import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider as ReduxProvider } from "react-redux";

import { Toaster } from 'sonner';
import { store } from './redux/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <ReduxProvider store={store}>

          <Toaster richColors /> 
    <App />

    </ReduxProvider>
  </StrictMode>,
)

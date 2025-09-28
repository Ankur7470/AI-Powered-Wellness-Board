import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { WellnessProvider } from './contexts/WellnessContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WellnessProvider>
      <App />
    </WellnessProvider>
  </StrictMode>,
);
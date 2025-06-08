
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { EventProvider } from './context/EventContext'
import { UnifiedEventProvider } from './context/UnifiedEventContext'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EventProvider>
      <UnifiedEventProvider>
        <App />
      </UnifiedEventProvider>
    </EventProvider>
  </React.StrictMode>
);

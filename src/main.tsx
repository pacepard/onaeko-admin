import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { registerWebMCPTools } from './agent/webmcp';
import { ensureMockSession } from './utils/dev-mock.util';

ensureMockSession();
registerWebMCPTools();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);

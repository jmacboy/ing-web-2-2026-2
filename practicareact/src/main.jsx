import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';

import { BrowserRouter } from 'react-router';
import RouterConfig from './routes/RouterConfig';
import NavigationHandler from './routes/NavigationHandler';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <NavigationHandler />
            <RouterConfig />
        </BrowserRouter>
    </StrictMode>,
);

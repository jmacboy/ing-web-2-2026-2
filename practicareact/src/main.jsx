import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router';
import PersonList from './PersonList.jsx';
import FormPersona from './FormPersona.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PersonList />} />
                <Route path="/personas" element={<PersonList />} />
                <Route path="/personas/create" element={<FormPersona />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);

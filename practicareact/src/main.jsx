import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router';
import PersonList from './PersonList.jsx';
import FormPersona from './FormPersona.jsx';
import FormLogin from './auth/FormLogin.jsx';
import Dashboard from './Dashboard.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<FormLogin />} />
                <Route path="/personas" element={<PersonList />} />
                <Route path="/personas/create" element={<FormPersona />} />
                <Route path="/personas/:id" element={<FormPersona />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);

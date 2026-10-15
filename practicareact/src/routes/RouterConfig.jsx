import { Route, Routes } from 'react-router';
import AuthenticatedRoute from './AuthenticatedRoute';
import FormPersona from '../pages/personas/FormPersona';
import PersonList from '../pages/personas/PersonList';
import Dashboard from '../Dashboard.jsx';
import FormLogin from '../pages/auth/FormLogin';
import FormRegistro from '../pages/auth/FormRegistro';
const RouterConfig = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AuthenticatedRoute>
                        <Dashboard />
                    </AuthenticatedRoute>
                }
            />
            <Route path="/login" element={<FormLogin />} />
            <Route path="/register" element={<FormRegistro />} />
            <Route
                path="/personas"
                element={
                    <AuthenticatedRoute>
                        <PersonList />
                    </AuthenticatedRoute>
                }
            />
            <Route
                path="/personas/create"
                element={
                    <AuthenticatedRoute>
                        <FormPersona />
                    </AuthenticatedRoute>
                }
            />
            <Route
                path="/personas/:id"
                element={
                    <AuthenticatedRoute>
                        <FormPersona />
                    </AuthenticatedRoute>
                }
            />
        </Routes>
    );
};

export default RouterConfig;

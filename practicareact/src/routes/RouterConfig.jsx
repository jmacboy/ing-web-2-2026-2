import { Route, Routes } from 'react-router';
import AuthenticatedRoute from './AuthenticatedRoute';
import FormPersona from '../pages/personas/FormPersona';
import PersonList from '../pages/personas/PersonList';
import Dashboard from '../Dashboard.jsx';
import FormLogin from '../pages/auth/FormLogin';
import FormRegistro from '../pages/auth/FormRegistro';
import ProductoList from '../pages/productos/ProductoList';
import FormProducto from '../pages/productos/FormProducto';
import CategoriaList from '../pages/categorias/CategoriaList';
import FormCategoria from '../pages/categorias/FormCategoria';
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
            <Route path="/productos" element={<AuthenticatedRoute><ProductoList /></AuthenticatedRoute>} />
            <Route path="/productos/create" element={<AuthenticatedRoute><FormProducto /></AuthenticatedRoute>} />
            <Route path="/productos/:id" element={<AuthenticatedRoute><FormProducto /></AuthenticatedRoute>} />
            <Route path="/categorias" element={<AuthenticatedRoute><CategoriaList /></AuthenticatedRoute>} />
            <Route path="/categorias/create" element={<AuthenticatedRoute><FormCategoria /></AuthenticatedRoute>} />
            <Route path="/categorias/:id" element={<AuthenticatedRoute><FormCategoria /></AuthenticatedRoute>} />
        </Routes>
    );
};

export default RouterConfig;

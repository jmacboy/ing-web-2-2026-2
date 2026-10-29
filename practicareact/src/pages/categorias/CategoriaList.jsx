import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Navbar from '../../components/Navbar';
import { deleteCategoria, getCategoriaList } from '../../services/CategoriaService';

const CategoriaList = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadCategorias = async () => {
        setError('');
        try {
            setCategorias(await getCategoriaList());
        } catch {
            setError('No se pudieron cargar las categorías. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategoriaList()
            .then((data) => {
                setCategorias(data);
            })
            .catch(() => {
                setError('No se pudieron cargar las categorías. Intenta nuevamente.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleDelete = async (categoria) => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar ${categoria.nombre}?`)) return;
        setError('');
        try {
            await deleteCategoria(categoria.id);
            await loadCategorias();
        } catch {
            setError('No se pudo eliminar la categoría. Intenta nuevamente.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="card">
                    <h2 className="card-title">Lista de Categorías</h2>
                    {error && (
                        <p role="alert" className="mt-2 text-red-500">
                            {error}
                        </p>
                    )}
                    {loading ? (
                        <p role="status">Cargando categorías...</p>
                    ) : (
                        <div className="mt-2">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorias.map((categoria) => (
                                        <tr key={categoria.id}>
                                            <td>{categoria.nombre}</td>
                                            <td>
                                                <Link
                                                    to={`/categorias/${categoria.id}`}
                                                    className="cursor-pointer rounded-full bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
                                                >
                                                    Editar
                                                </Link>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(categoria)}
                                                    className="cursor-pointer rounded-full bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {categorias.length === 0 && <p>No hay categorías registradas.</p>}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CategoriaList;

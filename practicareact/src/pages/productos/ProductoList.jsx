import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Navbar from '../../components/Navbar';
import { deleteProducto, getProductoList } from '../../services/ProductoService';

const ProductoList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadProductos = async () => {
        setError('');
        try {
            setProductos(await getProductoList());
        } catch {
            setError('No se pudieron cargar los productos. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductoList()
            .then((data) => {
                setProductos(data);
            })
            .catch(() => {
                setError('No se pudieron cargar los productos. Intenta nuevamente.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleDelete = async (producto) => {
        if (!window.confirm(`¿Estás seguro de que deseas eliminar ${producto.nombre}?`)) return;
        setError('');
        try {
            await deleteProducto(producto.id);
            await loadProductos();
        } catch {
            setError('No se pudo eliminar el producto. Intenta nuevamente.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="card">
                    <h2 className="card-title">Lista de Productos</h2>
                    {error && (
                        <p role="alert" className="mt-2 text-red-500">
                            {error}
                        </p>
                    )}
                    {loading ? (
                        <p role="status">Cargando productos...</p>
                    ) : (
                        <div className="mt-2">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Categoría</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto) => (
                                        <tr key={producto.id}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.precio}</td>
                                            <td>{producto.stock}</td>
                                            <td>
                                                {producto.categoria?.nombre ?? producto.categoriaId}
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/productos/${producto.id}`}
                                                    className="cursor-pointer rounded-full bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
                                                >
                                                    Editar
                                                </Link>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(producto)}
                                                    className="cursor-pointer rounded-full bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {productos.length === 0 && <p>No hay productos registrados.</p>}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductoList;

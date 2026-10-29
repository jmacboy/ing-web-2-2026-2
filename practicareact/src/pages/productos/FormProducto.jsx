import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useNavigate, useParams } from 'react-router';
import Navbar from '../../components/Navbar';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { getProductoById, insertProducto, updateProducto } from '../../services/ProductoService';
import { getCategoriaList } from '../../services/CategoriaService';

const productoSchema = z.object({
    nombre: z.string().trim().min(1, 'El nombre es requerido'),
    precio: z.string().min(1, 'El precio es requerido').refine((value) => Number.isFinite(Number(value)) && Number(value) >= 0, 'El precio debe ser un número mayor o igual a 0').transform(Number),
    stock: z.string().min(1, 'El stock es requerido').regex(/^\d+$/, 'El stock debe ser un número entero').transform(Number),
    categoriaId: z.string().min(1, 'La categoría es requerida').transform(Number),
});

const FormProducto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(productoSchema) });

    useEffect(() => {
        const loadForm = async () => {
            setError('');
            try {
                const categoryData = await getCategoriaList();
                setCategorias(categoryData);
                if (id) {
                    const producto = await getProductoById(id);
                    setValue('nombre', producto.nombre);
                    setValue('precio', String(producto.precio));
                    setValue('stock', String(producto.stock));
                    setValue('categoriaId', String(producto.categoriaId));
                }
            } catch {
                setError('No se pudieron cargar los datos del formulario. Intenta nuevamente.');
            } finally {
                setLoading(false);
            }
        };
        loadForm();
    }, [id, setValue]);

    const processData = async (data) => {
        setError('');
        try {
            if (id) await updateProducto(id, data);
            else await insertProducto(data);
            navigate('/productos');
        } catch {
            setError('No se pudo guardar el producto. Verifica los datos e intenta nuevamente.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container"><div className="card">
                <h2 className="card-title">{id ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                {error && <p role="alert" className="text-red-500">{error}</p>}
                {loading ? <p role="status">Cargando formulario...</p> : (
                    <form onSubmit={handleSubmit(processData)}>
                        <FormInput labelText="Nombre" id="txtNombre" placeholder="Nombre" errorText={errors.nombre?.message} {...register('nombre')} />
                        <FormInput labelText="Precio" id="txtPrecio" type="number" step="any" min="0" placeholder="Precio" errorText={errors.precio?.message} {...register('precio')} />
                        <FormInput labelText="Stock" id="txtStock" type="number" min="0" step="1" placeholder="Stock" errorText={errors.stock?.message} {...register('stock')} />
                        <div>
                            <label htmlFor="categoriaId">Categoría</label>
                            <select id="categoriaId" className="w-full rounded-md border border-solid border-gray-300 bg-white px-3 py-1.5" defaultValue="" {...register('categoriaId')}>
                                <option value="" disabled>Selecciona una categoría</option>
                                {categorias.map((categoria) => <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)}
                            </select>
                            {errors.categoriaId && <span className="text-red-500">{errors.categoriaId.message}</span>}
                        </div>
                        <div className="mt-4"><Button text={isSubmitting ? 'Guardando...' : 'Guardar'} type="submit" disabled={isSubmitting} />{' '}<button type="button" onClick={() => navigate('/productos')}>Cancelar</button></div>
                    </form>
                )}
            </div></div>
        </>
    );
};

export default FormProducto;

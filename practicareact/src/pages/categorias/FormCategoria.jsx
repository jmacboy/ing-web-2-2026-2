import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useNavigate, useParams } from 'react-router';
import Navbar from '../../components/Navbar';
import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import { getCategoriaById, insertCategoria, updateCategoria } from '../../services/CategoriaService';

const categoriaSchema = z.object({
    nombre: z.string().trim().min(1, 'El nombre es requerido'),
});

const FormCategoria = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(categoriaSchema) });

    useEffect(() => {
        const loadForm = async () => {
            setError('');
            try {
                if (id) {
                    const categoria = await getCategoriaById(id);
                    setValue('nombre', categoria.nombre);
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
            if (id) await updateCategoria(id, data);
            else await insertCategoria(data);
            navigate('/categorias');
        } catch {
            setError('No se pudo guardar la categoría. Verifica los datos e intenta nuevamente.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container"><div className="card">
                <h2 className="card-title">{id ? 'Editar Categoría' : 'Nueva Categoría'}</h2>
                {error && <p role="alert" className="text-red-500">{error}</p>}
                {loading ? <p role="status">Cargando formulario...</p> : (
                    <form onSubmit={handleSubmit(processData)}>
                        <FormInput labelText="Nombre" id="txtNombre" placeholder="Nombre" errorText={errors.nombre?.message} {...register('nombre')} />
                        <div className="mt-4"><Button text={isSubmitting ? 'Guardando...' : 'Guardar'} type="submit" disabled={isSubmitting} />{' '}<button type="button" onClick={() => navigate('/categorias')}>Cancelar</button></div>
                    </form>
                )}
            </div></div>
        </>
    );
};

export default FormCategoria;

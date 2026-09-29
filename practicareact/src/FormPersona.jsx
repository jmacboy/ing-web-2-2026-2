import FormInput from './components/FormInput';
import Button from './components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const personaSchema = z.object({
    nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    apellido: z.string().min(3, 'El apellido debe tener al menos 3 caracteres'),
    edad: z
        .string()
        .min(1, 'La edad es requerida')
        .regex(/^-?\d+$/, 'Debe ser un número entero')
        .transform(Number)
        .pipe(z.number().min(0, 'El mínimo es 1').max(120, 'El máximo es 120')),
    ciudad: z.string().min(1, 'La ciudad es requerida'),
    fechaNacimiento: z
        .string()
        .min(1, 'La fecha de nacimiento es requerida')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha no es válida'),
});

const FormPersona = () => {
    const navigate = useNavigate(); //hook de navegación

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(personaSchema),
    });
    const processData = (data) => {
        axios.post('http://localhost:3000/personas', data).then((response) => {
            console.log(response.data);
            navigate('/personas');
        });
    };
    return (
        <div className="container">
            <div className="card">
                <h2 className="card-title">Formulario de Persona</h2>
                <form onSubmit={handleSubmit(processData)}>
                    <FormInput
                        labelText="Nombre"
                        id="txtNombre"
                        placeholder="Nombre"
                        errorText={errors.nombre?.message}
                        {...register('nombre', { required: true })}
                    />
                    <FormInput
                        labelText="Apellido"
                        id="txtApellido"
                        placeholder="Apellido"
                        errorText={errors.apellido?.message}
                        {...register('apellido', { required: true })}
                    />
                    <FormInput
                        labelText="Edad"
                        id="txtEdad"
                        placeholder="Edad"
                        errorText={errors.edad?.message}
                        {...register('edad', { required: true })}
                        type="number"
                    />
                    <FormInput
                        labelText="Ciudad"
                        id="txtCiudad"
                        placeholder="Ciudad"
                        errorText={errors.ciudad?.message}
                        {...register('ciudad', { required: true })}
                    />
                    <FormInput
                        labelText="Fecha de Nacimiento"
                        type="date"
                        id="txtFechaNacimiento"
                        placeholder="Fecha de Nacimiento"
                        errorText={errors.fechaNacimiento?.message}
                        {...register('fechaNacimiento', { required: true })}
                    />
                    {/* <div>
                        El nombre escrito es: {nombre} {apellido}
                    </div> */}
                    <div className="mt-4">
                        <Button text="Enviar" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormPersona;

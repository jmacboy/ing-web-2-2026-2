import Button from '../../components/Button';
import { useNavigate } from 'react-router';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '../../components/Navbar';
import { registerUser } from '../../services/AuthService';
import FormInput from '../../components/FormInput';

const registerSchema = z.object({
    email: z.string('email es obligatorio').email('Email no es válido'),
    fullname: z.string('nombre es obligatorio'),
    password: z
        .string('password es obligatoria')
        .min(6, 'Contraseña debe tener al menos 6 caracteres'),
});

const FormRegistro = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const processData = (data) => {
        registerUser(data)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                if (
                    error.response.status === 400 &&
                    error.response.data.message === 'Email already in use'
                ) {
                    alert('El email ya está en uso. Por favor, use otro email.');
                } else {
                    alert('Error al registrarse');
                }
            });
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="card">
                    <h2 className="card-title">Registrarse</h2>
                    <form onSubmit={handleSubmit(processData)}>
                        <FormInput
                            labelText="Nombre"
                            id="txtName"
                            type="text"
                            placeholder="Nombre"
                            errorText={errors.fullname?.message}
                            {...register('fullname', { required: true })}
                        />

                        <FormInput
                            labelText="Email"
                            id="txtEmail"
                            type="email"
                            placeholder="Email"
                            errorText={errors.email?.message}
                            {...register('email', { required: true })}
                        />
                        <FormInput
                            labelText="Contraseña"
                            id="txtPassword"
                            type="password"
                            placeholder="Contraseña"
                            errorText={errors.password?.message}
                            {...register('password', { required: true })}
                        />

                        <div className="mt-4">
                            <Button text="Registro" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormRegistro;

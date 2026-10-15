import Button from '../../components/Button';
import { useNavigate } from 'react-router';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '../../components/Navbar';
import { loginUser } from '../../services/AuthService';
import FormInput from '../../components/FormInput';
import { setToken } from '../../services/TokenService';

const loginSchema = z.object({
    email: z.string('email es obligatorio').email('Email no es válido'),
    password: z
        .string('password es obligatoria')
        .min(6, 'Contraseña debe tener al menos 6 caracteres'),
});

const FormLogin = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const processData = (data) => {
        loginUser(data)
            .then((response) => {
                if (response.token) {
                    setToken(response.token);
                    navigate('/personas');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('Error al iniciar sesión');
            });
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="card">
                    <h2 className="card-title">Iniciar sesión</h2>
                    <form onSubmit={handleSubmit(processData)}>
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
                            <Button text="Iniciar sesión" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormLogin;

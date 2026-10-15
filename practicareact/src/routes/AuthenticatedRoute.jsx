import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const AuthenticatedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);
    return <>{children}</>;
};

export default AuthenticatedRoute;

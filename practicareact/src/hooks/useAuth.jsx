import { useState } from 'react';
import { getToken, removeToken } from '../services/TokenService';
import { useNavigate } from 'react-router';

const useAuth = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(getToken() ? true : false);
    const logoutClick = () => {
        removeToken();
        navigate('/login');
    };
    return {
        isLoggedIn,
        logoutClick,
    };
};

export default useAuth;

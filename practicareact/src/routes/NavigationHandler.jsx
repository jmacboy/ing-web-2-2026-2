import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { setNavigation } from '../config/navigationRef';

const NavigationHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setNavigation(navigate);
    }, [navigate]);

    return null;
};

export default NavigationHandler;

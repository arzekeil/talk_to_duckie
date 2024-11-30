import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
        return element;
    }

    navigate('/login');
    return <>error :/</>;
};

export default ProtectedRoute;
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import MyAppBar from './MyAppBar';

const ProtectedRoute = ({ element }: { element: any }) => {
    // const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    const isAuthenticated = true;
    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate('/login');
    //     }
    // }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
        return (
            <>
                <MyAppBar />
                {element}
            </>
        );
    }

    navigate('/login');
    return <>error :/</>;
};

export default ProtectedRoute;
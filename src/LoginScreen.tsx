import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]); // Dependency on `isAuthenticated` to rerun effect when authentication state changes

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={() => loginWithRedirect()}>Login with Auth0</button>
        </div>
    );
};

export default LoginButton;
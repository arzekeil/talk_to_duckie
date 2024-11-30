import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    return (
        <>
            {!isLoading && !isAuthenticated && (
                <button onClick={() => loginWithRedirect()}>Log In</button>
            )}
        </>
    );
};

export default LoginButton;
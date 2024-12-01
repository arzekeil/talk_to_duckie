import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RecordScreen from './RecordScreen';
import HomeScreen from './HomeScreen';
import { Box } from '@mui/material';
import LoginButton from './LoginScreen';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from './components/ProtectedRoute';
import Loading from './components/Loading';


const App = () => {
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Router>
            <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="grey.100">
                <Routes>
                    <Route path="/login" element={
                        <LoginButton />
                    }
                    />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute element={<HomeScreen />} />
                        }
                    />
                    <Route
                        path="/mock"
                        element={
                            <ProtectedRoute element={<RecordScreen />} />
                        }
                    />
                </Routes>
            </Box>
        </Router>
    )
}

export default App
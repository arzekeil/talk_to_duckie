import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RecordScreen from './RecordScreen';
import HomeScreen from './HomeScreen';
import { Box } from '@mui/material';
import MyAppBar from './components/MyAppBar';
import LoginButton from './LoginScreen';
import { useAuth0 } from '@auth0/auth0-react';


const App = () => {
    // const { user, isAuthenticated, isLoading } = useAuth0();
    const isAuthenticated = true;

    return (
        <Router>
            <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="grey.100">
                <MyAppBar />
                <Routes>
                    <Route path="/login" element={
                        isAuthenticated ? <Navigate to="/" /> : <LoginButton />
                    }
                    />
                    <Route
                        path="/"
                        element={
                            isAuthenticated ? <HomeScreen /> : <Navigate to="/login" />
                        }
                    />
                    <Route path="/mock" element={
                        isAuthenticated ? <RecordScreen /> : <Navigate to="/login" />
                    } />
                </Routes>
            </Box>
        </Router>
    )
}

export default App
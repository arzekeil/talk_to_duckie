import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Auth0Provider } from '@auth0/auth0-react';

import './styles/index.css'
import theme from './theme.ts';
import App from './App.tsx'
import MyAppBar from './components/MyAppBar.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Auth0Provider
        domain="dev-8umbcy6gfupavsp0.us.auth0.com"
        clientId="IbmIafj7wYww5gZ2PmKT1ljnljDFT159"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <MyAppBar />
        <App />
      </Auth0Provider>
    </ThemeProvider>
  </StrictMode>,
)

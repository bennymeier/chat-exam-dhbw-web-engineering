import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AuthProvider from './components/AuthProvider';
import RequireAuth from './components/RequireAuth';
import './index.css';

const PROTECTED_ROUTES = ['/chat', '/room', '/chat/:id', '/room/:id'];

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {PROTECTED_ROUTES.map((route) => (
              <Route
                key={route}
                path={route}
                element={
                  <RequireAuth>
                    <App />
                  </RequireAuth>
                }
              />
            ))}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

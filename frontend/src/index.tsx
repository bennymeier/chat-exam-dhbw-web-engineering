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
import { Provider } from 'react-redux';
import { configureStore } from './store';

const PROTECTED_ROUTES = ['/chat', '/room', '/chat/:id', '/room/:id'];
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
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
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

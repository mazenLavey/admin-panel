import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UsersProvider } from 'context/UsersContext';
import { AuthContextProvider } from 'context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

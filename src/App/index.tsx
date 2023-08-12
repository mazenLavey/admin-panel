import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import RootLayout from 'layouts/RootLayout';
import Home from 'pages/Home';
import Admin from 'pages/Admin';
import Register from 'pages/Register';
import ProtectedRoute from 'common/ProtectedRoute/index';
import 'normalize.css';
import './index.css';
import UnauthenticatedUserRoute from 'common/UnauthenticatedUserRoute';

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='admin' element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path='login' element={
          <UnauthenticatedUserRoute>
            <Register />
          </UnauthenticatedUserRoute>
        } />
        <Route path='signup' element={
          <UnauthenticatedUserRoute>
            <Register />
          </UnauthenticatedUserRoute>
        } />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

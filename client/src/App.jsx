import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    // loader: () => {
    //   if (localStorage.getItem('access_token')) {
    //     throw redirect('/');
    //   }
    //   return null;
    // },
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

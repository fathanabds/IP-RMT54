import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SpoonAi from './pages/SpoonAI';
import MyRecipe from './pages/MyRecipe';
import FavoriteRecipe from './pages/FavoriteRecipe';

const router = createBrowserRouter([
  {
    loader: () => {
      if (localStorage.getItem('access_token')) {
        throw redirect('/');
      }
      return null;
    },
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
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),
    loader: () => {
      if (!localStorage.getItem('access_token')) {
        throw redirect('/login');
      }
      return null;
    },
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/spoon-ai',
        element: <SpoonAi />,
      },
      {
        path: '/my-recipes',
        element: <MyRecipe />,
      },
      {
        path: '/favorite-recipes',
        element: <FavoriteRecipe />,
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

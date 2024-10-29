import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('access_token');
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to={'/'}>
          <img src="/src/assets/ladle.png" alt="Ladle" width="30" height="24" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to={'/'}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={'/spoon-ai'}>
                Spoon AI
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={'/my-recipes'}>
                My Recipes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={'/favorite-recipes'}>
                Favorite Recipes
              </Link>
            </li>
          </ul>
          <button onClick={handleLogout} className="btn btn-outline-danger">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

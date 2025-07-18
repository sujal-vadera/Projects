import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaHeart, FaComments, FaSignOutAlt } from 'react-icons/fa';
import { getFromStorage, removeFromStorage } from '../utils/storageUtils';

function Navbar() {
  const [location, setLocation] = useState('Select City');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const user = getFromStorage('currentUser');
      setCurrentUser(user);
    };
    checkUser();
    const interval = setInterval(checkUser, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    removeFromStorage('currentUser');
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
      {/* Brand logo */}
      <Link className="navbar-brand fw-bold" to="/">AutoDealz</Link>

      {/* City selection dropdown */}
      <div className="dropdown me-2">
        <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
          {location}
        </button>
        <ul className="dropdown-menu">
          {['Mumbai', 'Delhi', 'Pune'].map((city) => (
            <li key={city}>
              <button className="dropdown-item" onClick={() => setLocation(city)}>{city}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Search bar */}
      <form className="d-flex flex-grow-1 me-2">
        <input className="form-control form-control-sm me-2" type="search" placeholder="Search cars, bikes..." />
        <button className="btn btn-outline-primary btn-sm" type="submit">Search</button>
      </form>

      {/* User action icons for mobile view */}
      {currentUser?.role === 'user' && (
        <div className="d-flex d-lg-none align-items-center me-2">
          <Link to="/Favourites" className="btn btn-sm me-2" title="Favourites">
            <FaHeart className="text-danger" size={18} />
          </Link>
          <Link to="/Messages" className="btn btn-sm" title="Chat">
            <FaComments className="text-primary" size={18} />
          </Link>
        </div>
      )}

      {/* Toggle button for mobile navbar */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMain"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible navbar section */}
      <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarMain">
        <ul className="navbar-nav ms-auto align-items-lg-center">

          {/* User action icons for desktop view */}
          {currentUser?.role === 'user' && (
            <div className="d-none d-lg-flex align-items-center me-3">
              <Link to="/Favourites" className="btn btn-sm me-2" title="Favourites">
                <FaHeart className="text-danger" size={18} />
              </Link>
              <Link to="/Messages" className="btn btn-sm" title="Chat">
                <FaComments className="text-primary" size={18} />
              </Link>
            </div>
          )}

          {/* User-only links */}
          {currentUser?.role === 'user' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/SellVehicle">Sell Vehicle</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/MyVehicles">My Vehicles</Link>
              </li>
            </>
          )}

          {/* Edit profile link for logged-in users */}
          {currentUser && (
            <li className="nav-item">
              <Link className="nav-link" to="/EditProfile">Edit Profile</Link>
            </li>
          )}

          {/* Login or Logout button */}
          <li className="nav-item mt-2 mt-lg-0">
            {currentUser ? (
              <button className="btn btn-outline-danger btn-sm ms-lg-3" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" /> Logout
              </button>
            ) : (
              <Link className="btn btn-outline-dark btn-sm ms-lg-3" to="/Login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

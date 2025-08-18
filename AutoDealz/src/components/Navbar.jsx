// import { Link, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { FaHeart, FaComments, FaSignOutAlt } from 'react-icons/fa';
// import { getFromStorage, removeFromStorage } from '../utils/storageUtils';

// function Navbar() {
//   const [location, setLocation] = useState('Select City');
//   const [cityList, setCityList] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkUser = () => {
//       const user = getFromStorage('currentUser');
//       setCurrentUser(user);
//     };
//     checkUser();
//     const interval = setInterval(checkUser, 500);
//     return () => clearInterval(interval);
//   }, []);

//   // ✅ Load cities from localStorage
//   useEffect(() => {
//     const cities = JSON.parse(localStorage.getItem('cities')) || [];
//     setCityList(cities);
//   }, []);

//   const handleLogout = () => {
//     removeFromStorage('currentUser');
//     alert('Logged out successfully!');
//     navigate('/');
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
//       <Link className="navbar-brand fw-bold" to="/">AutoDealz</Link>

//       {/* City Dropdown - only for non-admin users */}
//       {currentUser?.role !== 'admin' && (
//         <div className="dropdown me-2">
//           <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
//             {location}
//           </button>
//           <ul className="dropdown-menu">
//             {cityList.length === 0 ? (
//               <li><span className="dropdown-item disabled">No cities</span></li>
//             ) : (
//               cityList.map((city) => (
//                 <li key={city}>
//                   <button className="dropdown-item" onClick={() => setLocation(city)}>{city}</button>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       )}

//       {/* Search */}
//       {currentUser?.role !== 'admin' && (
//         <form className="d-flex flex-grow-1 me-2">
//           <input className="form-control form-control-sm me-2" type="search" placeholder="Search cars, bikes..." />
//           <button className="btn btn-outline-primary btn-sm" type="submit">Search</button>
//         </form>
//       )}

//       {/* Mobile Icons */}
//       {currentUser?.role === 'user' && (
//         <div className="d-flex d-lg-none align-items-center me-2">
//           <Link to="/Favourites" className="btn btn-sm me-2" title="Favourites">
//             <FaHeart className="text-danger" size={18} />
//           </Link>
//           <Link to="/Messages" className="btn btn-sm" title="Chat">
//             <FaComments className="text-primary" size={18} />
//           </Link>
//         </div>
//       )}

//       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarMain">
//         <ul className="navbar-nav ms-auto align-items-lg-center">

//           {/* Desktop Icons */}
//           {currentUser?.role === 'user' && (
//             <div className="d-none d-lg-flex align-items-center me-3">
//               <Link to="/Favourites" className="btn btn-sm me-2" title="Favourites">
//                 <FaHeart className="text-danger" size={18} />
//               </Link>
//               <Link to="/Messages" className="btn btn-sm" title="Chat">
//                 <FaComments className="text-primary" size={18} />
//               </Link>
//             </div>
//           )}

//           {/* Buyer/Seller Options */}
//           {currentUser?.role === 'user' && (
//             <>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/SellVehicle">Sell Vehicle</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/MyVehicles">My Vehicles</Link>
//               </li>
//             </>
//           )}

//           {/* Admin Panel */}
//           {currentUser?.role === 'admin' && (
//             <li className="nav-item">
//               <Link className="nav-link text-danger fw-bold" to="/Admin/AdminDashboard">Admin Panel</Link>
//             </li>
//           )}

//           {/* Edit Profile */}
//           {currentUser && (
//             <li className="nav-item">
//               <Link className="nav-link" to="/EditProfile">Edit Profile</Link>
//             </li>
//           )}

//           {/* Login / Logout */}
//           <li className="nav-item mt-2 mt-lg-0">
//             {currentUser ? (
//               <button className="btn btn-outline-danger btn-sm ms-lg-3" onClick={handleLogout}>
//                 <FaSignOutAlt className="me-1" /> Logout
//               </button>
//             ) : (
//               <Link className="btn btn-outline-dark btn-sm ms-lg-3" to="/Login">Login</Link>
//             )}
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart, FaComments, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const [location, setLocation] = useState('Select City');
  const [cityList, setCityList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const user = JSON.parse(sessionStorage.getItem('currentUser'));
      setCurrentUser(user);
    };
    checkUser();
    const interval = setInterval(checkUser, 500);
    return () => clearInterval(interval);
  }, []);

  // ✅ Load cities from JSON Server
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get('http://localhost:5000/cities');
        setCityList(res.data.map(c => c.name)); // expecting format: { id, name }
      } catch (err) {
        console.error('Failed to load cities:', err);
      }
    };
    fetchCities();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
      <Link className="navbar-brand fw-bold" to="/">AutoDealz</Link>

      {currentUser?.role !== 'admin' && (
        <div className="dropdown me-2">
          <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
            {location}
          </button>
          <ul className="dropdown-menu">
            {cityList.length === 0 ? (
              <li><span className="dropdown-item disabled">No cities</span></li>
            ) : (
              cityList.map((city, index) => (
                <li key={index}>
                  <button className="dropdown-item" onClick={() => setLocation(city)}>{city}</button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {currentUser?.role !== 'admin' && (
        <form className="d-flex flex-grow-1 me-2">
          <input className="form-control form-control-sm me-2" type="search" placeholder="Search cars, bikes..." />
          <button className="btn btn-outline-primary btn-sm" type="submit">Search</button>
        </form>
      )}

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

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarMain">
        <ul className="navbar-nav ms-auto align-items-lg-center">

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

          {currentUser?.role === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link text-danger fw-bold" to="/Admin/AdminDashboard">Admin Panel</Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link className="nav-link" to="/EditProfile">Edit Profile</Link>
            </li>
          )}

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

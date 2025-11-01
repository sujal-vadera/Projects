

// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaHeart, FaComments, FaSignOutAlt } from "react-icons/fa";
// import { useEffect, useState } from "react";

// function Navbar() {
//   const navigate = useNavigate();

//   // ✅ Redux user
//   const currentUserRedux = useSelector((state) => state.user.user);

//   // ✅ Fallback from localStorage
//   const [currentUser, setCurrentUser] = useState(
//     currentUserRedux || JSON.parse(localStorage.getItem("user"))
//   );

//   // ✅ Keep Redux and localStorage in sync
//   useEffect(() => {
//     if (currentUserRedux) setCurrentUser(currentUserRedux);
//   }, [currentUserRedux]);

//   // ✅ Logout function
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     alert("Logged out successfully!");
//     navigate("/login");
//     window.location.reload(); // refresh navbar instantly
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
//       {/* Logo */}
//       <Link className="navbar-brand fw-bold" to="/">
//         AutoDealz
//       </Link>

//       {/* Mobile toggle */}
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarMain"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       {/* Navbar content */}
//       <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarMain">
//         <ul className="navbar-nav ms-auto align-items-lg-center">

//           {/* ✅ ADMIN NAVBAR */}
//           {currentUser?.role === "admin" ? (
//             <>
//               <li className="nav-item">
//                 <Link
//                   className="nav-link text-danger fw-bold"
//                   to="/Admin/AdminDashboard"
//                 >
//                   Admin Panel
//                 </Link>
//               </li>

//               {/* ✅ Admin Profile Dropdown */}
//               <li className="nav-item dropdown">
//                 <button
//                   className="btn btn-outline-secondary btn-sm dropdown-toggle ms-lg-2"
//                   type="button"
//                   data-bs-toggle="dropdown"
//                 >
//                   Profile
//                 </button>
//                 <ul className="dropdown-menu dropdown-menu-end">
//                   <li>
//                     <Link className="dropdown-item" to="/EditProfile">
//                       Edit Profile
//                     </Link>
//                   </li>
//                   <li>
//                     <button
//                       className="dropdown-item text-danger"
//                       onClick={handleLogout}
//                     >
//                       <FaSignOutAlt className="me-1" /> Logout
//                     </button>
//                   </li>
//                 </ul>
//               </li>
//             </>
//           ) : (
//             <>
//               {/* ✅ Common Navbar for Buyer & Seller */}
//               <li className="nav-item">
//                 <Link className="nav-link" to="/BuyVehicle">
//                   Buy Vehicle
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link" to="/SellVehicle">
//                   Sell Vehicle
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link" to="/MyVehicles">
//                   My Vehicles
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link" to="/Favourites">
//                   <FaHeart className="text-danger me-1" />
//                   Wishlist
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link" to="/Messages">
//                   <FaComments className="text-primary me-1" />
//                   Messages
//                 </Link>
//               </li>

//               {/* ✅ Profile Dropdown (Buyer/Seller) */}
//               {currentUser && (
//                 <li className="nav-item dropdown">
//                   <button
//                     className="btn btn-outline-secondary btn-sm dropdown-toggle"
//                     type="button"
//                     data-bs-toggle="dropdown"
//                   >
//                     Profile
//                   </button>
//                   <ul className="dropdown-menu dropdown-menu-end">
//                     <li>
//                       <Link className="dropdown-item" to="/EditProfile">
//                         Edit Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <button
//                         className="dropdown-item text-danger"
//                         onClick={handleLogout}
//                       >
//                         <FaSignOutAlt className="me-1" /> Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </li>
//               )}
//             </>
//           )}

//           {/* ✅ Login Button for not logged-in users */}
//           {!currentUser && (
//             <li className="nav-item mt-2 mt-lg-0">
//               <Link
//                 className="btn btn-outline-dark btn-sm ms-lg-3"
//                 to="/Login"
//               >
//                 Login
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaComments, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  //  Sirf localStorage se user lena
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

 
  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null); // navbar update instantly
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm px-3">
     
      <Link className="navbar-brand fw-bold" to="/">
        AutoDealz
      </Link>

      {/* Mobile toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMain"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar content */}
      <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarMain">
        <ul className="navbar-nav ms-auto align-items-lg-center">

          {/*  ADMIN NAVBAR */}
          {currentUser?.role === "admin" ? (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link text-danger fw-bold"
                  to="/Admin/AdminDashboard"
                >
                  Admin Panel
                </Link>
              </li>

              {/* Admin Profile Dropdown */}
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-secondary btn-sm dropdown-toggle ms-lg-2"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Profile
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/EditProfile">
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-1" /> Logout
                    </button>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              {/*  Common Navbar for Buyer & Seller */}
              <li className="nav-item">
                <Link className="nav-link" to="/BuyVehicle">
                  Buy used Vehicle
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/SellVehicle">
                  Sell Vehicle
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/MyVehicles">
                  My Vehicles
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/Favourites">
                  <FaHeart className="text-danger me-1" />
                  Wishlist
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/Messages">
                  <FaComments className="text-primary me-1" />
                  Messages
                </Link>
              </li>

              {/* Profile Dropdown (Buyer/Seller) */}
              {currentUser && (
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-outline-secondary btn-sm dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    Profile
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/EditProfile">
                        Edit Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt className="me-1" /> Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </>
          )}

          {/* Login Button for not logged-in users */}
          {!currentUser && (
            <li className="nav-item mt-2 mt-lg-0">
              <Link
                className="btn btn-outline-dark btn-sm ms-lg-3"
                to="/Login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

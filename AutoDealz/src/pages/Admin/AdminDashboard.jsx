// // src/pages/Admin/AdminDashboard.jsx

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function AdminDashboard() {
//   const [usersCount, setUsersCount] = useState(0);
//   const [adsCount, setAdsCount] = useState(0);
//   const [citiesCount, setCitiesCount] = useState(0);
//   const [categoriesCount, setCategoriesCount] = useState(0);

//   useEffect(() => {
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const ads = JSON.parse(localStorage.getItem('ads')) || [];
//     const cities = JSON.parse(localStorage.getItem('cities')) || [];
//     const categories = JSON.parse(localStorage.getItem('categories')) || [];

//     // ✅ Only count users with role "user"
//     const userOnly = users.filter(u => u.role === 'user');
//     setUsersCount(userOnly.length);
//     setAdsCount(ads.length);
//     setCitiesCount(cities.length);
//     setCategoriesCount(categories.length);
//   }, []);

//   return (
//     <div className="container py-4">
//       <h2 className="text-center mb-4">📊 Admin Dashboard</h2>

//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//           gap: '1rem',
//         }}
//       >
//         <div className="card text-white bg-primary p-3 rounded">
//           <h4>Total Users</h4>
//           <h2>{usersCount}</h2>
//         </div>

//         <div className="card text-white bg-success p-3 rounded">
//           <h4>Total Ads</h4>
//           <h2>{adsCount}</h2>
//         </div>

//         <div className="card text-white bg-warning p-3 rounded">
//           <h4>Total Cities</h4>
//           <h2>{citiesCount}</h2>
//         </div>

//         <div className="card text-white bg-info p-3 rounded">
//           <h4>Total Categories</h4>
//           <h2>{categoriesCount}</h2>
//         </div>
//       </div>

//       <hr className="my-4" />

//       <h4 className="mb-3">🔧 Admin Tools</h4>
//       <ul style={{ lineHeight: '2rem' }}>
//         <li><Link to="/Admin/ManageUsers">Manage Users</Link></li>
//         <li><Link to="/Admin/ManageVehicles">Manage Vehicles</Link></li>
//         <li><Link to="/Admin/ManageAds">Manage Ads</Link></li>
//         <li><Link to="/Admin/ManageCategories">Manage Categories</Link></li>
//         <li><Link to="/Admin/ManageCities">Manage Cities</Link></li>
//       </ul>
//     </div>
//   );
// }

// export default AdminDashboard;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [usersCount, setUsersCount] = useState(0);
  const [adsCount, setAdsCount] = useState(0);
  const [citiesCount, setCitiesCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, adsRes, citiesRes, categoriesRes] = await Promise.all([
          axios.get('http://localhost:5000/users'),
          axios.get('http://localhost:5000/ads'),
          axios.get('http://localhost:5000/cities'),
          axios.get('http://localhost:5000/categories'),
        ]);

        const userOnly = usersRes.data.filter(u => u.role === 'user');
        setUsersCount(userOnly.length);
        setAdsCount(adsRes.data.length);
        setCitiesCount(citiesRes.data.length);
        setCategoriesCount(categoriesRes.data.length);
      } catch (err) {
        console.error('Error loading dashboard stats:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">📊 Admin Dashboard</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        <div className="card text-white bg-primary p-3 rounded">
          <h4>Total Users</h4>
          <h2>{usersCount}</h2>
        </div>

        <div className="card text-white bg-success p-3 rounded">
          <h4>Total Ads</h4>
          <h2>{adsCount}</h2>
        </div>

        <div className="card text-white bg-warning p-3 rounded">
          <h4>Total Cities</h4>
          <h2>{citiesCount}</h2>
        </div>

        <div className="card text-white bg-info p-3 rounded">
          <h4>Total Categories</h4>
          <h2>{categoriesCount}</h2>
        </div>
      </div>

      <hr className="my-4" />

      <h4 className="mb-3"> Admin Tools</h4>
      <ul style={{ lineHeight: '2rem' }}>
        <li><Link to="/Admin/ManageUsers">Manage Users</Link></li>
        <li><Link to="/Admin/ManageAds">Manage Ads</Link></li>
        <li><Link to="/Admin/ManageCategories">Manage Categories</Link></li>
        <li><Link to="/Admin/ManageCities">Manage Cities</Link></li>
      </ul>
    </div>
  );
}

export default AdminDashboard;




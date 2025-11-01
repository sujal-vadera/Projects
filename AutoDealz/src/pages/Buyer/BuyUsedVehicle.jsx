// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import VehicleCard from '../../components/VehicleCard';
// import { getFromStorage } from '../../utils/storageUtils';

// const BuyUsedVehicle = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [vehicles, setVehicles] = useState([]);
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [cityOptions, setCityOptions] = useState([]);
//   const [categoryOptions, setCategoryOptions] = useState([]);

//   const dummyVehicles = [
//     {
//       id: 1,
//       title: 'Swift VXi 2020',
//       city: 'Mumbai',
//       price: '380000',
//       category: 'Car',
//       image: 'https://i.pinimg.com/736x/5e/87/db/5e87dbea5e6fbc7ca0f88a9a873f331c.jpg',
//       sellerName: 'Raj Malhotra',
//       sellerContact: '9876543210',
//       sellerEmail: 'raj@gmail.com',
//     },
//     {
//       id: 2,
//       title: 'Activa 6G',
//       city: 'Pune',
//       price: '75000',
//       category: 'Scooter',
//       image: 'https://i.pinimg.com/736x/4c/9a/2a/4c9a2aebe54a25ca474163406aec81a1.jpg',
//       sellerName: 'Neha Sharma',
//       sellerContact: '9123456780',
//       sellerEmail: 'neha@gmail.com',
//     },
//     {
//       id: 3,
//       title: 'Royal Enfield',
//       city: 'Mumbai',
//       price: '125000',
//       category: 'Bike',
//       image: 'https://i.pinimg.com/736x/32/5b/0d/325b0d518a5c4ea514649c20b01ac8a3.jpg',
//       sellerName: 'Amit Verma',
//       sellerContact: '9988776655',
//       sellerEmail: 'amit@gmail.com',
//     },
//     {
//       id: 4,
//       title: 'Hyundai i10',
//       city: 'Delhi',
//       price: '290000',
//       category: 'Car',
//       image: 'https://i.pinimg.com/1200x/28/b5/54/28b554ae02da007b81106025eb7ea453.jpg',
//       sellerName: 'Pooja Thakur',
//       sellerContact: '9001234567',
//       sellerEmail: 'pooja@gmail.com',
//     },
//   ];

//   useEffect(() => {
//     const current = getFromStorage('currentUser');
//     if (!current) {
//       alert('Please login to view vehicles.');
//       navigate('/Login');
//     } else {
//       setUser(current);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (!user) return;
//     const allAds = getFromStorage('ads') || [];
//     const othersVehicles = allAds.filter(
//       (v) => v.sellerEmail !== user.email
//     );
//     const finalList = [...othersVehicles, ...dummyVehicles];
//     setVehicles(finalList);
//   }, [user]);

//   useEffect(() => {
//     const cities = getFromStorage('cities') || [];
//     const categories = getFromStorage('categories') || [];

//     setCityOptions(cities);
//     setCategoryOptions(categories);
//   }, []);

//   const filteredVehicles = vehicles.filter((vehicle) => {
//     const cityMatch = selectedCity === '' || vehicle.city === selectedCity;
//     const categoryMatch = selectedCategory === '' || vehicle.category === selectedCategory;
//     return cityMatch && categoryMatch;
//   });

//   if (!user) return null;

//   return (
//     <div className="container my-4">
//       <h2 className="text-center">
//         Welcome, <span className="text-primary">{user.name}</span>
//       </h2>
//       <h4 className="mb-4 fw-bold text-center">Search Used Vehicles</h4>

//       {/* Filters */}
//       <div className="row mb-4">
//         <div className="col-md-6 mb-2">
//           <select
//             className="form-select"
//             value={selectedCity}
//             onChange={(e) => setSelectedCity(e.target.value)}
//           >
//             <option value="">Filter by City</option>
//             {cityOptions.map((city, index) => (
//               <option key={index} value={city}>{city}</option>
//             ))}
//           </select>
//         </div>
//         <div className="col-md-6 mb-2">
//           <select
//             className="form-select"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">Filter by Category</option>
//             {categoryOptions.map((cat, index) => (
//               <option key={index} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Vehicle Cards */}
//       <div className="row g-4">
//         {filteredVehicles.length === 0 ? (
//           <div className="text-center text-danger">
//             No vehicles found for selected filters.
//           </div>
//         ) : (
//           filteredVehicles.map((vehicle, index) => (
//             <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
//               <VehicleCard
//                 title={vehicle.title}
//                 price={vehicle.price}
//                 city={vehicle.city}
//                 image={vehicle.image}
//                 category={vehicle.category}
//                 id={vehicle.id}
//                 sellerName={vehicle.sellerName}
//                 sellerContact={vehicle.sellerContact}
//                 sellerEmail={vehicle.sellerEmail}
//               />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default BuyUsedVehicle;


// // src/pages/Buyer/BuyUsedVehicle.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// import VehicleCard from '../../components/VehicleCard';

// const BuyUsedVehicle = () => {
//   // const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [vehicles, setVehicles] = useState([]);
//   const [cityOptions, setCityOptions] = useState([]);
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [selectedCity, setSelectedCity] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const dummyVehicles = [
//     {
//       id: 1,
//       title: 'Swift VXi 2020',
//       city: 'Mumbai',
//       price: '380000',
//       category: 'Car',
//       image: 'https://i.pinimg.com/736x/5e/87/db/5e87dbea5e6fbc7ca0f88a9a873f331c.jpg',
//       sellerName: 'Raj Malhotra',
//       sellerContact: '9876543210',
//       sellerEmail: 'raj@gmail.com',
//     },
//     {
//       id: 2,
//       title: 'Activa 6G',
//       city: 'Pune',
//       price: '75000',
//       category: 'Scooter',
//       image: 'https://i.pinimg.com/736x/4c/9a/2a/4c9a2aebe54a25ca474163406aec81a1.jpg',
//       sellerName: 'Neha Sharma',
//       sellerContact: '9123456780',
//       sellerEmail: 'neha@gmail.com',
//     },
//     {
//       id: 3,
//       title: 'Royal Enfield',
//       city: 'Mumbai',
//       price: '125000',
//       category: 'Bike',
//       image: 'https://i.pinimg.com/736x/32/5b/0d/325b0d518a5c4ea514649c20b01ac8a3.jpg',
//       sellerName: 'Amit Verma',
//       sellerContact: '9988776655',
//       sellerEmail: 'amit@gmail.com',
//     },
//     {
//       id: 4,
//       title: 'Hyundai i10',
//       city: 'Delhi',
//       price: '290000',
//       category: 'Car',
//       image: 'https://i.pinimg.com/1200x/28/b5/54/28b554ae02da007b81106025eb7ea453.jpg',
//       sellerName: 'Pooja Thakur',
//       sellerContact: '9001234567',
//       sellerEmail: 'pooja@gmail.com',
//     },
//   ];

//   // 🔐 Check login
//   // useEffect(() => {
//   //   const storedUser = localStorage.getItem('currentUser');
//   //   if (!storedUser) {
//   //     alert('Please login first!');
//   //     navigate('/Login');
//   //   } else {
//   //     setUser(JSON.parse(storedUser));
//   //   }
//   // }, [navigate]);

//   // 🚘 Load ads from server
//   useEffect(() => {
//     if (!user) return;

//     axios.get('http://localhost:5000/ads')
//       .then(res => {
//         const ads = res.data.filter(ad => ad.sellerEmail !== user.email);
//         setVehicles([...ads, ...dummyVehicles]);
//       })
//       .catch(err => console.error('Error loading ads:', err));
//   }, [user]);

//   // 🌆 Load filter options
//   // useEffect(() => {
//   //   axios.get('http://localhost:5000/cities')
//   //     .then(res => setCityOptions(res.data))
//   //     .catch(err => console.error('Error loading cities:', err));

//   //   axios.get('http://localhost:5000/categories')
//   //     .then(res => setCategoryOptions(res.data))
//   //     .catch(err => console.error('Error loading categories:', err));
//   // }, []);

//   // 🔍 Apply filters
//   const filteredVehicles = vehicles.filter(vehicle => {
//     const cityMatch = selectedCity === '' || vehicle.city === selectedCity;
//     const categoryMatch = selectedCategory === '' || vehicle.category === selectedCategory;
//     return cityMatch && categoryMatch;
//   });

//   if (!user) return null;

//   return (
//     <div className="container my-4">
//       <h2 className="text-center">
//         Welcome, <span className="text-primary">{user.name}</span>
//       </h2>
//       <h4 className="mb-4 fw-bold text-center">Search Used Vehicles</h4>

//       {/* 🔽 Filters */}
//       <div className="row mb-4">
//   <div className="col-md-6 mb-2">
//     <select
//       className="form-select"
//       value={selectedCity}
//       onChange={(e) => setSelectedCity(e.target.value)}
//     >
//       <option value="">Filter by City</option>
//       {cityOptions.map((city, idx) => (
//         <option key={idx} value={city.name}>{city.name}</option>
//       ))}
//     </select>
//   </div>

//   <div className="col-md-6 mb-2">
//     <select
//       className="form-select"
//       value={selectedCategory}
//       onChange={(e) => setSelectedCategory(e.target.value)}
//     >
//       <option value="">Filter by Category</option>
//       {categoryOptions.map((cat, idx) => (
//         <option key={idx} value={cat.name}>{cat.name}</option>
//       ))}
//     </select>
//   </div>
// </div>


//       {/* 🚘 Vehicle Grid */}
//       <div className="row g-4">
//         {filteredVehicles.length === 0 ? (
//           <div className="text-center text-danger">
//             No vehicles found for selected filters.
//           </div>
//         ) : (
//           filteredVehicles.map((vehicle, index) => (
//             <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
//               <VehicleCard {...vehicle} />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default BuyUsedVehicle;




import React from 'react'

function BuyUsedVehicle() {
  return (
    <div>BuyUsedVehicle</div>
  )
}

export default BuyUsedVehicle
// import React, { useState, useEffect } from 'react';
// import { getFromStorage, setToStorage } from '../../utils/storageUtils';

// const SellVehicle = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     category: '',
//     price: '',
//     city: '',
//     image: '',
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [cities, setCities] = useState([]);
//   const currentUser = getFromStorage('currentUser');

//   // ✅ Load categories and cities
//   useEffect(() => {
//     const storedCategories = getFromStorage('categories') || [];
//     const storedCities = getFromStorage('cities') || [];

//     setCategories(storedCategories); // ✅ keep as string array
//     setCities(storedCities);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!currentUser) {
//       alert('Please login to post your vehicle.');
//       return;
//     }

//     const newVehicle = {
//       id: Date.now(),
//       title: formData.title,
//       price: formData.price,
//       city: formData.city,
//       category: formData.category,
//       image: formData.image,
//       sellerName: currentUser.name,
//       sellerEmail: currentUser.email,
//       sellerContact: currentUser.contact,
//     };

//     const existingAds = getFromStorage('ads') || [];
//     const updatedAds = [...existingAds, newVehicle];
//     setToStorage('ads', updatedAds);

//     setSubmitted(true);
//     console.log('✔️ Vehicle Submitted:', newVehicle);

//     setFormData({
//       title: '',
//       category: '',
//       price: '',
//       city: '',
//       image: '',
//     });
//   };

//   useEffect(() => {
//     if (submitted) {
//       const timer = setTimeout(() => setSubmitted(false), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [submitted]);

//   return (
//     <div className="container my-4">
//       <h2 className="text-center fw-bold mb-4">Add Vehicle for Sale</h2>

//       {submitted && (
//         <div className="alert alert-success" role="alert">
//           Vehicle listed successfully!
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
//         {/* 🔹 Vehicle Title */}
//         <div className="mb-3">
//           <label className="form-label">Vehicle Title</label>
//           <input
//             type="text"
//             className="form-control"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="e.g., Maruti Swift 2020"
//             required
//           />
//         </div>

//         {/* 🔹 Category */}
//         <div className="mb-3">
//           <label className="form-label">Category</label>
//           <select
//             className="form-select"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.length === 0 ? (
//               <option disabled>No categories available</option>
//             ) : (
//               categories.map((cat, index) => (
//                 <option key={index} value={cat}>
//                   {cat}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         {/* 🔹 Price */}
//         <div className="mb-3">
//           <label className="form-label">Price (₹)</label>
//           <input
//             type="number"
//             className="form-control"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             placeholder="e.g., 350000"
//             required
//           />
//         </div>

//         {/* 🔹 City */}
//         <div className="mb-3">
//           <label className="form-label">City</label>
//           <select
//             className="form-select"
//             name="city"
//             value={formData.city}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select City</option>
//             {cities.length === 0 ? (
//               <option disabled>No cities available</option>
//             ) : (
//               cities.map((city, index) => (
//                 <option key={index} value={city}>
//                   {city}
//                 </option>
//               ))
//             )}
//           </select>
//         </div>

//         {/* 🔹 Image URL */}
//         <div className="mb-3">
//           <label className="form-label">Image URL</label>
//           <input
//             type="url"
//             className="form-control"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             placeholder="Paste image link"
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">
//           Submit Vehicle
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SellVehicle;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SellVehicle = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    city: '',
    image: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // 🔄 Load currentUser from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
      alert('Please login to post your vehicle.');
    }
    setCurrentUser(user);
  }, []);

  // ✅ Load categories and cities from JSON server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, cityRes] = await Promise.all([
          axios.get('http://localhost:5000/categories'),
          axios.get('http://localhost:5000/cities'),
        ]);
        setCategories(catRes.data);
        setCities(cityRes.data);
      } catch (err) {
        console.error('Error fetching categories/cities:', err);
        alert('Failed to load dropdown data.');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('Please login first.');
      return;
    }

    const newVehicle = {
      id: Date.now().toString(),
      title: formData.title,
      price: formData.price,
      city: formData.city,
      category: formData.category,
      image: formData.image,
      sellerName: currentUser.name,
      sellerEmail: currentUser.email,
      sellerContact: currentUser.contact,
    };

    try {
      await axios.post('http://localhost:5000/ads', newVehicle);
      setSubmitted(true);

      setFormData({
        title: '',
        category: '',
        price: '',
        city: '',
        image: '',
      });
    } catch (err) {
      console.error('Error submitting vehicle:', err);
      alert('Failed to submit vehicle.');
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setSubmitted(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <div className="container my-4">
      <h2 className="text-center fw-bold mb-4">Add Vehicle for Sale</h2>

      {submitted && (
        <div className="alert alert-success" role="alert">
          Vehicle listed successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
        {/* 🔹 Vehicle Title */}
        <div className="mb-3">
          <label className="form-label">Vehicle Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Maruti Swift 2020"
            required
          />
        </div>

        {/* 🔹 Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.length === 0 ? (
              <option disabled>No categories available</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* 🔹 Price */}
        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 350000"
            required
          />
        </div>

        {/* 🔹 City */}
        <div className="mb-3">
          <label className="form-label">City</label>
          <select
            className="form-select"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            {cities.length === 0 ? (
              <option disabled>No cities available</option>
            ) : (
              cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* 🔹 Image URL */}
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="url"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Paste image link"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Vehicle
        </button>
      </form>
    </div>
  );
};

export default SellVehicle;


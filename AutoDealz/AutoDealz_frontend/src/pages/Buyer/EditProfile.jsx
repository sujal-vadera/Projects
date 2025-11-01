// import React, { useEffect, useState } from 'react';
// import { getFromStorage, setToStorage } from '../../utils/storageUtils';
// import { useNavigate } from 'react-router-dom';

// const EditProfile = () => {
//   const navigate = useNavigate();
//   const currentUser = getFromStorage('currentUser');

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     contact: '', //  added contact
//   });

//   // Load current user data
//   useEffect(() => {
//     if (!currentUser) {
//       alert('Please login first!');
//       navigate('/Login');
//       return;
//     }

//     setFormData({
//       name: currentUser.name || '',
//       email: currentUser.email || '',
//       password: currentUser.password || '',
//       contact: currentUser.contact || '', 
//     });
//   }, []);

 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Update profile data
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const users = getFromStorage('users') || [];

//     const updatedUsers = users.map((user) =>
//       user.email === currentUser.email
//         ? { ...user, ...formData }
//         : user
//     );

//     // Preserve role
//     const updatedCurrentUser = {
//       ...currentUser,
//       ...formData,
//     };

//     setToStorage('users', updatedUsers);
//     setToStorage('currentUser', updatedCurrentUser);

//     alert('Profile updated successfully!');
//     navigate('/');
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: '500px' }}>
//       <h3 className="text-center mb-4 fw-bold">Edit Your Profile</h3>

//       <form onSubmit={handleSubmit} className="border p-4 shadow-sm bg-light rounded">
//         {/* 🔤 Name */}
//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Email */}
//         <div className="mb-3">
//           <label className="form-label">Email (can't be changed)</label>
//           <input
//             type="email"
//             className="form-control"
//             name="email"
//             value={formData.email}
//             disabled
//           />
//         </div>

//         {/* Contact */}
//         <div className="mb-3">
//           <label className="form-label">Contact</label>
//           <input
//             type="tel"
//             className="form-control"
//             name="contact"
//             value={formData.contact}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-success w-100">
//            Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;

// src/pages/user/EditProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
  });

  const baseURL = 'http://localhost:5000';

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!storedUser) {
      alert('Please login first!');
      navigate('/Login');
      return;
    }

    axios.get(`${baseURL}/users/${storedUser.id}`)
      .then(res => {
        const user = res.data;
        setCurrentUser(user);
        setFormData({
          name: user.name || '',
          email: user.email || '',
          password: user.password || '',
          contact: user.contact || '',
        });
      })
      .catch(err => {
        console.error('User fetch failed:', err);
        alert('Something went wrong while fetching user!');
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser?.id) {
      alert('User ID missing.');
      return;
    }

    try {
      const updatedUser = { ...currentUser, ...formData };
      await axios.put(`${baseURL}/users/${currentUser.id}`, updatedUser);

      // Update sessionStorage
      sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));

      alert('Profile updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Profile update failed:', err);
      alert('Failed to update profile.');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h3 className="text-center mb-4 fw-bold">Edit Your Profile</h3>

      <form onSubmit={handleSubmit} className="border p-4 shadow-sm bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email (cannot be changed)</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            disabled
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contact</label>
          <input
            type="tel"
            className="form-control"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

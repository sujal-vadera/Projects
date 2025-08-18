// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { getFromStorage, setToStorage } from '../utils/storageUtils';

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const users = getFromStorage('users') || [];

//     // Check if user exists with matching email and password
//     const loggedInUser = users.find(
//       user =>
//         user.email.toLowerCase() === formData.email.toLowerCase() &&
//         user.password === formData.password.trim()
//     );

//     if (!loggedInUser) {
//       alert('Invalid email or password');
//       return;
//     }

//     // Store current user in localStorage
//     setToStorage('currentUser', loggedInUser);

// alert(`Welcome ${loggedInUser.name}!`);

//     // Redirect based on role
//     if (loggedInUser.role === 'admin') {
//       navigate('/Admin/AdminDashboard');
//     } else {
//       navigate('/BuyUsedVehicle');
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: '400px' }}>
//       <h3 className="text-center mb-4">User Login</h3>

//       <form onSubmit={handleSubmit}>
//         {/* Email input field */}
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Password input field */}
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             autoComplete="current-password"
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">Login</button>
//       </form>

//       {/* Registration link */}
//       <p className="text-center mt-3">
//         Don't have an account? <Link to="/Registration">Register here</Link>
//       </p>
//     </div>
//   );
// }

// export default Login; 



// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { getFromStorage, setToStorage } from '../utils/storageUtils';

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const users = getFromStorage('users') || [];

//     // Check if user exists with matching email and password
//     const loggedInUser = users.find(
//       user =>
//         user.email.toLowerCase() === formData.email.toLowerCase() &&
//         user.password === formData.password.trim()
//     );

//     if (!loggedInUser) {
//       alert('Invalid email or password');
//       return;
//     }

//     // Store current user in localStorage
//     setToStorage('currentUser', loggedInUser);

// alert(`Welcome ${loggedInUser.name}!`);

//     // Redirect based on role
//     if (loggedInUser.role === 'admin') {
//       navigate('/Admin/AdminDashboard');
//     } else {
//       navigate('/BuyUsedVehicle');
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: '400px' }}>
//       <h3 className="text-center mb-4">User Login</h3>

//       <form onSubmit={handleSubmit}>
//         {/* Email input field */}
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Password input field */}
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             autoComplete="current-password"
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">Login</button>
//       </form>

//       {/* Registration link */}
//       <p className="text-center mt-3">
//         Don't have an account? <Link to="/Registration">Register here</Link>
//       </p>
//     </div>
//   );
// }

// export default Login; 



import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get('http://localhost:5000/users');
      const users = res.data;

      // 🔐 Find matching user
      const loggedInUser = users.find(
        user =>
          user.email.toLowerCase() === formData.email.toLowerCase() &&
          user.password === formData.password.trim()
      );

      if (!loggedInUser) {
        alert('Invalid email or password');
        return;
      }

      // ✅ Save to sessionStorage (no storageUtils)
      sessionStorage.setItem('currentUser', JSON.stringify(loggedInUser));
      alert(`Welcome ${loggedInUser.name}!`);

      // 🚀 Navigate based on role
      if (loggedInUser.role === 'admin') {
        navigate('/Admin/AdminDashboard');
      } else {
        navigate('/BuyUsedVehicle');
      }

    } catch (err) {
      console.error('Login failed:', err);
      alert('Something went wrong while logging in.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">User Login</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      <p className="text-center mt-3">
        Don't have an account? <Link to="/Registration">Register here</Link>
      </p>
    </div>
  );
}

export default Login;

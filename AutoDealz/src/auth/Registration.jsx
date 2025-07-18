import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setToStorage, getFromStorage } from '../utils/storageUtils';

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const existingUsers = getFromStorage('users') || [];

    // Check if user with same email already exists
    const alreadyExists = existingUsers.some(
      user => user.email === formData.email
    );

    if (alreadyExists) {
      alert('Email already registered!');
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      password: formData.password,
      role: formData.role
    };

    const updatedUsers = [...existingUsers, newUser];
    setToStorage('users', updatedUsers);

    alert('Registered successfully!');
    navigate('/Login');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">User Registration</h3>

      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email field */}
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact number field */}
        <div className="mb-3">
          <label>Contact Number</label>
          <input
            type="tel"
            className="form-control"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            required
          />
        </div>

        {/* Password field */}
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        {/* Confirm password field */}
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        {/* Role selection */}
        <div className="mb-3">
          <label>Select Role</label>
          <select
            className="form-select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>

      <p className="text-center mt-3">
        Already registered? <Link to="/Login">Login here</Link>
      </p>
    </div>
  );
}

export default Registration;

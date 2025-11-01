

import { useState } from 'react';

// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from "../redux/slices/user"

function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, msg, error } = useSelector((state) => state.user)


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    role: "buyer",
    // confirmPassword: ''
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handelClick = (e) => {
    e.preventDefault();
    dispatch(createUser(formData)) // thunk call
    

  }
  if (msg && !error) { 
  navigate("/login")
  
  console.log(msg)
    console.log(error); 
}

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">User Registration</h3>

      <form onSubmit={handelClick}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            // value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            // value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Contact Number</label>
          <input
            type="tel"
            className="form-control"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder=""
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            required
            
          />
        </div>

    
        <select
          name="role"
          onChange={handleChange}
          className="form-control mb-3"
          required
        >
          <option value="">-Select role-</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>

        <button type="submit" className="btn btn-primary w-100" >
          {loading ? "registering......" : " register"}
        </button>
      </form>

      {msg && <p className="text-success mt-3">{msg}</p>}
      {error && <p className="text-danger mt-3">{error}</p>}

      <p className="text-center mt-3">
        Already registered? <Link to="/Login">Login here</Link>
      </p>
    </div>
  );
}

export default Registration;
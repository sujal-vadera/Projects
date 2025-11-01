
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { userLogin } from "../redux/slices/user"
import { useDispatch, useSelector } from 'react-redux';


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, msg, error } = useSelector((state) => state.user)


  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(formData => ({
      ...formData,
      [e.target.name]: e.target.value
    }));
  };

const handelClick = async () => {
    dispatch(userLogin(formData)).then(res => {
        if (res.meta.requestStatus === "fulfilled") {
            const { token, user } = res.payload;
            const sessionData = {
                email: user.email,
                username: user.name,
                token: token,
                userid: user.id,
                role: user.role
            };
            localStorage.setItem('user', JSON.stringify(sessionData));
           

            if(user.role ==="buyer" || user.role ==="seller"){
              navigate("/")
            }else if( user.role ==="admin"){
              navigate("/Admin/AdminDashboard")
            }else{
              console.log("login failed" , res)
            }
        }
    });
};


 

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3 className="text-center mb-4">User Login</h3>

      <form >
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

        <button onClick={handelClick} type="button" className="btn btn-primary w-100 " disabled={loading}> {loading ? "Logging in..." : "Login"}</button>
      </form>

      {error && <p className="text-danger">{error}</p>}
      {msg && <p className="text-success">{msg}</p>}

      <p className="text-center mt-3">
        Don't have an account? <Link to="/Registration">Register here</Link>
      </p>
    </div>
  );
}

export default Login;

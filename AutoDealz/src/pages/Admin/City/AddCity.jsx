import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addcity } from '../../../redux/slices/city';

function AddCity() {
    const [city, setcity] = useState("");
    const { loading, error, message } = useSelector(state => state.city)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addcity({cityName : city}));
        setcity("")

    }

    return (
        <div>
            <Navbar />

            <div className="container mt-5">
                <div className='d-flex align-items-center'>
                <h2 className="mb-4">Add city</h2>
                <button onClick={()=>navigate("/Admin/ManageCities")} className='btn btn-primary btn-sm mb-4 m-2'>view category</button>
                </div> 
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="cityName" className="form-label">city Name</label>
                        <input onChange={(e) => setcity(e.target.value)} value={city} type="text" className="form-control" id="cityName" placeholder="Enter city name" required />
                    </div>
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? "Adding...." : "Add city"}
                    </button>

                    {message && <p style={{ color: "green" }}>{message}</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>

        </div>
    )
}

export default AddCity
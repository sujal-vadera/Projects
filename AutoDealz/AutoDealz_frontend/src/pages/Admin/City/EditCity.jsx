import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { editCity, updateCity } from '../../../redux/slices/city';
import { useNavigate, useParams } from 'react-router-dom';

function EditCity() {
  const [cityName, setcityName] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {id}= useParams()
  const { loading, error, message, currentcity } = useSelector(state => state.city)

  useEffect(() => {
    dispatch(editCity(id))
  
  }, [dispatch, id])

  useEffect(() => {
    if (currentcity) {
      setcityName(currentcity.cityName)

    }
  }, [currentcity])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCity({ id, cityName: cityName }))
    navigate("/Admin/ManageCities")

  }


  return (
    <div>
      <Navbar />


      <div className="container mt-5">
        <h2 className="mb-4">Edit city</h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="cityname" className="form-label">city Name</label>
            <input onChange={(e) => setcityName(e.target.value)} defaultValue={currentcity?.cityName} type="text" className="form-control" placeholder="Enter city name" required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "updating...." : "update city"}
          </button>

          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>

  )
}

export default EditCity
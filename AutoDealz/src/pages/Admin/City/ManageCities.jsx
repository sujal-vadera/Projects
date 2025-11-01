import React, { useEffect } from 'react'
import Navbar from '../../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCity, getcity } from '../../../redux/slices/city'

function ManageCities() {
  const { loading, error, message, citydata } = useSelector(state => state.city)
  const Navigate = useNavigate();
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getcity())
  }, [])

  const handeldelete = (id) => {
    dispatch(deleteCity(id))
  }




  return (
    <div>
      <Navbar />
      <h1>Manage city</h1>
      <button onClick={() => Navigate(`/Admin/AddCity`)} type="button" className="btn btn-success">Add city</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className='table table-borderd'>
        <thead>
          <tr>
            <th>city name </th>
          </tr>
        </thead>

        <tbody>

          {citydata.map(city => (
            <tr key={city._id}>
              <td>{city.cityName}</td>
              <td><button
                onClick={() => Navigate(`/Admin/EditCity/${city._id}`)}
                className="btn btn-primary"
              >
                Edit
              </button></td>

              <td><button onClick={() => handeldelete(city._id)} className='btn btn-danger'> {loading ? "deleting...." : "delete"}</button></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default ManageCities

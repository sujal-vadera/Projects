
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, deleteCategory } from '../../../redux/slices/category';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';


function ManageCategories() {
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  const { loading, error, message, catdata } = useSelector(state => state.category)
  //  console.log(catdata)
  useEffect(() => {
    dispatch(getCategory())
  }, [])

  const handeldelete = (id) => {
    dispatch(deleteCategory(id))

  }

  return (
    <div>
              <Navbar />
      <h1>Manage Categories</h1>
      <button onClick={()=>Navigate( `/Admin/AddCategory`)} type="button" class="btn btn-success">Add category</button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className='table table-borderd'>
        <thead>
          <tr>
            <th>catgory name </th>
          </tr>
        </thead>

        <tbody>

          {catdata.map(cat => (
            <tr key={cat._id}>
              <td>{cat.categoryName}</td>
              <td><button
                onClick={() => Navigate(`/Admin/EditCategory/${cat._id}`)}
                className="btn btn-primary"
              >
                Edit
              </button></td>

              <td><button  onClick={() => handeldelete(cat._id)} className='btn btn-danger'> {loading ? "deleting...." : "delete"}</button></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>


  )
}

export default ManageCategories
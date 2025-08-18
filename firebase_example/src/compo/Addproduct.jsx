import React, { useState } from 'react'
import {db} from './Firebase'
import { collection, addDoc  } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


function Addproduct() {
  const [formdata, setformdata] = useState({
    username: "",
    productName: "",
    productCategory: "",
    imgUrl: ""

  });
  const navigate = useNavigate();

  const handelchange = (e) => {
    const { id, value } = e.target;

    setformdata(
      {
        ...formdata,
        [id]: value
      })

  }

  const handelSubmit = async (e) => {

    e.preventDefault()
    try {
      const docref = await addDoc(collection(db, "products"), formdata)
      console.log(docref.id)
      // setformdata("")
      navigate("/Homepage")
    } catch (error) {
      console.log(error)
    }

  }



  return (
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Product Form</h5>

          <form onSubmit={handelSubmit}>

            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                value={formdata.username}
                required
                onChange={handelchange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                placeholder="Enter product name"
                value={formdata.productName}

                required
                onChange={handelchange}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="productCategory" className="form-label">Product Category</label>
              <input
                type="text"
                className="form-control"
                id="productCategory"
                placeholder="Enter product category"
                value={formdata.productCategory}

                required
                onChange={handelchange}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="imgUrl" className="form-label">Image URL</label>
              <input
                type="url"
                className="form-control"
                id="imgUrl"
                value={formdata.imgUrl}

                onChange={handelchange}
              />
            </div>


            <div className="d-grid">
              <button type="Submit" className="btn btn-primary" >Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}


export default Addproduct
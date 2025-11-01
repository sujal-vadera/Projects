import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../../redux/slices/category';
import { useNavigate } from 'react-router-dom';

function AddCategory() {
    const [catname, setcatname] = useState("");
    const { loading, error, message } = useSelector(state => state.category)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addCategory({ categoryName: catname }));
        setcatname("");
    }

    return (
        <div>
            <Navbar />

            <div className="container mt-5">
                <div className='d-flex align-items-center '>
                    <h2 className="mb-4">Add Category</h2>
                    <button onClick={() => navigate("/Admin/ManageCategories")} className='btn btn-primary m-2 mb-4 btn-sm'>view category</button>
                </div>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                        <input onChange={(e) => setcatname(e.target.value)} value={catname} type="text" className="form-control" id="categoryName" placeholder="Enter category name" required />
                    </div>
                    <button type="submit" className="btn btn-success btn-lg" disabled={loading}>
                        {loading ? "Adding...." : "Add Category"}
                    </button>

                    {message && <p style={{ color: "green" }}>{message}</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>

        </div>
    )
}

export default AddCategory
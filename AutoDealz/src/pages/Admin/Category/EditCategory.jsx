import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editCategory, updateCategory } from '../../../redux/slices/category';
import Navbar from '../../../components/Navbar';

function EditCategory() {
    const [catname, setcatname] = useState("");
    const { loading, error, message, currentCategory } = useSelector(state => state.category)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();




    useEffect(() => {
        dispatch(editCategory(id));
    }, [dispatch, id])

    useEffect(() => {
        if (currentCategory) {
            setcatname(currentCategory.categoryName)
        }

    }, [currentCategory])



    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("category name to  update", catname)
        dispatch(updateCategory({ id, categoryName: catname }));
        navigate("/Admin/ManageCategories")
    }


    return (

        <div>
            <Navbar />


            <div className="container mt-5">
                <h2 className="mb-4">Edit Category</h2>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                        <input onChange={(e) => setcatname(e.target.value)} defaultValue={currentCategory?.categoryName} type="text" className="form-control" placeholder="Enter category name" required />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "updating...." : "update Category"}
                    </button>

                    {message && <p style={{ color: "green" }}>{message}</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </div>

    )
}

export default EditCategory
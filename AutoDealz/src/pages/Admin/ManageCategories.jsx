// import React, { useState, useEffect } from 'react';
// import '../../App.css'; // optional: for custom styling
// import { getFromStorage, setToStorage } from '../../utils/storageUtils';

// const ManageCategories = () => {
//   const [categories, setCategories] = useState([]);
//   const [newCategory, setNewCategory] = useState('');
//   const [editIndex, setEditIndex] = useState(null);
//   const [editedCategory, setEditedCategory] = useState('');

//   useEffect(() => {
//     const storedCategories = getFromStorage('categories') || [];
//     setCategories(storedCategories);
//     console.log('Loaded categories:', storedCategories);
//   }, []);

//   const handleAddCategory = () => {
//     if (newCategory.trim() === '') return;
//     const updatedCategories = [...categories, newCategory.trim()];
//     setCategories(updatedCategories);
//     setToStorage('categories', updatedCategories);
//     setNewCategory('');
//   };

//   const handleDeleteCategory = (index) => {
//     const updatedCategories = categories.filter((_, i) => i !== index);
//     setCategories(updatedCategories);
//     setToStorage('categories', updatedCategories);
//   };

//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setEditedCategory(categories[index]);
//   };

//   const handleUpdateCategory = () => {
//     if (editedCategory.trim() === '') return;
//     const updatedCategories = categories.map((cat, i) =>
//       i === editIndex ? editedCategory.trim() : cat
//     );
//     setCategories(updatedCategories);
//     setToStorage('categories', updatedCategories);
//     setEditIndex(null);
//     setEditedCategory('');
//   };

//   return (
//     <div className="container">
//       <h2>Manage Categories</h2>
//       <div className="form-group">
//         <input
//           type="text"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//           placeholder="Enter category"
//         />
//         <button onClick={handleAddCategory}>Add</button>
//       </div>

//       <ul>
//         {categories.map((category, index) => (
//           <li key={index}>
//             {editIndex === index ? (
//               <>
//                 <input
//                   type="text"
//                   value={editedCategory}
//                   onChange={(e) => setEditedCategory(e.target.value)}
//                 />
//                 <button onClick={handleUpdateCategory}>Update</button>
//                 <button onClick={() => setEditIndex(null)}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 {category}
//                 <button onClick={() => handleEdit(index)}>Edit</button>
//                 <button onClick={() => handleDeleteCategory(index)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManageCategories;


import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const [editedCategory, setEditedCategory] = useState('');

  // 🔹 Fetch categories from JSON Server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Add new category
  const handleAddCategory = async () => {
    const trimmed = newCategory.trim();
    if (trimmed === '') return;
    try {
      const res = await axios.post('http://localhost:5000/categories', { name: trimmed });
      setCategories((prev) => [...prev, res.data]);
      setNewCategory('');
    } catch (err) {
      console.error('Error adding category:', err);
    }
  };

  // 🔹 Delete category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  // 🔹 Start editing
  const handleEdit = (id, name) => {
    setEditId(id);
    setEditedCategory(name);
  };

  // 🔹 Update edited category
  const handleUpdateCategory = async () => {
    const trimmed = editedCategory.trim();
    if (trimmed === '') return;
    try {
      await axios.put(`http://localhost:5000/categories/${editId}`, { name: trimmed });
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editId ? { ...cat, name: trimmed } : cat
        )
      );
      setEditId(null);
      setEditedCategory('');
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };

  return (
    <div className="container">
      <h2>Manage Categories</h2>

      <div className="form-group mb-3 d-flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category"
          className="form-control"
        />
        <button onClick={handleAddCategory} className="btn btn-success">
          Add
        </button>
      </div>

      <ul className="list-group">
        {categories.map((category) => (
          <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === category.id ? (
              <div className="d-flex gap-2 w-100">
                <input
                  type="text"
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                  className="form-control"
                />
                <button onClick={handleUpdateCategory} className="btn btn-primary">
                  Update
                </button>
                <button onClick={() => setEditId(null)} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>{category.name}</span>
                <div>
                  <button onClick={() => handleEdit(category.id, category.name)} className="btn btn-sm btn-warning me-2">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCategory(category.id)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;
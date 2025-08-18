// import React, { useState, useEffect } from 'react';

// const ManageCities = () => {
//   const [cities, setCities] = useState([]);
//   const [newCity, setNewCity] = useState('');
//   const [editIndex, setEditIndex] = useState(null);
//   const [editedCity, setEditedCity] = useState('');

//   // 🔸 Load cities from localStorage on mount
//   useEffect(() => {
//     const storedCities = JSON.parse(localStorage.getItem('cities')) || [];
//     setCities(storedCities);
//   }, []);

//   // 🔸 Save cities to localStorage
//   const updateLocalStorage = (updatedCities) => {
//     localStorage.setItem('cities', JSON.stringify(updatedCities));
//     setCities(updatedCities);
//   };

//   // 🔸 Add city
//   const handleAddCity = () => {
//     if (newCity.trim() && !cities.includes(newCity.trim())) {
//       const updatedCities = [...cities, newCity.trim()];
//       updateLocalStorage(updatedCities);
//       setNewCity('');
//     }
//   };

//   // 🔸 Delete city
//   const handleDeleteCity = (index) => {
//     const updatedCities = cities.filter((_, i) => i !== index);
//     updateLocalStorage(updatedCities);
//   };

//   // 🔸 Start editing
//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setEditedCity(cities[index]);
//   };

//   // 🔸 Save edited city
//   const handleSaveEdit = () => {
//     const updatedCities = [...cities];
//     updatedCities[editIndex] = editedCity.trim();
//     updateLocalStorage(updatedCities);
//     setEditIndex(null);
//     setEditedCity('');
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Manage Cities</h2>

//       <input
//         type="text"
//         placeholder="Enter new city"
//         value={newCity}
//         onChange={(e) => setNewCity(e.target.value)}
//       />
//       <button onClick={handleAddCity}>Add City</button>

//       <ul>
//         {cities.map((city, index) => (
//           <li key={index} style={{ marginTop: '10px' }}>
//             {editIndex === index ? (
//               <>
//                 <input
//                   type="text"
//                   value={editedCity}
//                   onChange={(e) => setEditedCity(e.target.value)}
//                 />
//                 <button onClick={handleSaveEdit}>Save</button>
//               </>
//             ) : (
//               <>
//                 {city}
//                 <button onClick={() => handleEdit(index)} style={{ marginLeft: '10px' }}>Edit</button>
//                 <button onClick={() => handleDeleteCity(index)} style={{ marginLeft: '5px' }}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ManageCities;




import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCities = () => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState('');
  const [editId, setEditId] = useState(null);
  const [editedCity, setEditedCity] = useState('');

  // 🔹 Load cities from backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get('http://localhost:5000/cities');
        setCities(res.data);
      } catch (err) {
        console.error('Failed to fetch cities:', err);
      }
    };
    fetchCities();
  }, []);

  // 🔹 Add new city
  const handleAddCity = async () => {
    const trimmed = newCity.trim();
    if (trimmed === '') return;

    try {
      const res = await axios.post('http://localhost:5000/cities', { name: trimmed });
      setCities((prev) => [...prev, res.data]);
      setNewCity('');
    } catch (err) {
      console.error('Failed to add city:', err);
    }
  };

  // 🔹 Delete city
  const handleDeleteCity = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cities/${id}`);
      setCities((prev) => prev.filter((city) => city.id !== id));
    } catch (err) {
      console.error('Failed to delete city:', err);
    }
  };

  // 🔹 Start editing
  const handleEdit = (id, name) => {
    setEditId(id);
    setEditedCity(name);
  };

  // 🔹 Save edited city
  const handleSaveEdit = async () => {
    const trimmed = editedCity.trim();
    if (trimmed === '') return;

    try {
      await axios.put(`http://localhost:5000/cities/${editId}`, { name: trimmed });
      setCities((prev) =>
        prev.map((city) =>
          city.id === editId ? { ...city, name: trimmed } : city
        )
      );
      setEditId(null);
      setEditedCity('');
    } catch (err) {
      console.error('Failed to update city:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Cities</h2>

      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          placeholder="Enter new city"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          className="form-control"
        />
        <button onClick={handleAddCity} className="btn btn-success">
          Add City
        </button>
      </div>

      <ul className="list-group">
        {cities.map((city) => (
          <li key={city.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === city.id ? (
              <div className="d-flex gap-2 w-100">
                <input
                  type="text"
                  value={editedCity}
                  onChange={(e) => setEditedCity(e.target.value)}
                  className="form-control"
                />
                <button onClick={handleSaveEdit} className="btn btn-primary">Save</button>
                <button onClick={() => setEditId(null)} className="btn btn-secondary">Cancel</button>
              </div>
            ) : (
              <>
                <span>{city.name}</span>
                <div>
                  <button onClick={() => handleEdit(city.id, city.name)} className="btn btn-sm btn-warning me-2">Edit</button>
                  <button onClick={() => handleDeleteCity(city.id)} className="btn btn-sm btn-danger">Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCities;
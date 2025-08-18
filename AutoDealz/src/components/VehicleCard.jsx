// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function VehicleCard({
//   title,
//   price,
//   city,
//   image,
//   category,
//   id,
//   sellerName,
//   sellerEmail,
//   sellerContact,
//   showFavouriteBtn = true,
// }) {
//   const navigate = useNavigate();

//   const vehicle = {
//     title,
//     price,
//     city,
//     image,
//     category,
//     id,
//     sellerName,
//     sellerEmail,
//     sellerContact,
//   };

//   const addToFavourites = () => {
//     const existing = JSON.parse(localStorage.getItem('favourites')) || [];

//     const isAlreadyAdded = existing.some(
//       (v) => v.title === vehicle.title && v.city === vehicle.city
//     );

//     if (isAlreadyAdded) {
//       alert('Already in favourites!');
//       return;
//     }

//     const updated = [...existing, vehicle];
//     localStorage.setItem('favourites', JSON.stringify(updated));
//     alert('Added to favourites!');
//   };

//   // 👇 Category click handle karne ke liye
//   const handleCategoryClick = () => {
//     navigate(`/BuyUsedVehicle?category=${category}`);
//   };

//   return (
//     <div className="card shadow-sm" style={{ width: '100%', maxWidth: '300px' }}>
//       <img
//         src={image}
//         className="card-img-top"
//         alt={title}
//         style={{ height: '180px', objectFit: 'cover' }}
//         onError={(e) =>
//           (e.target.src = 'https://via.placeholder.com/300x180?text=No+Image')
//         }
//       />

//       <div className="card-body">
//         <h5 className="card-title">{title}</h5>
//         <p className="card-text mb-1"><strong>Price:</strong> ₹{price}</p>
//         <p className="card-text mb-1"><strong>City:</strong> {city}</p>

//         <p className="card-text mb-1">
//           <strong>Category:</strong>{' '}
//           <button
//             className="btn btn-link p-0 m-0 align-baseline"
//             onClick={handleCategoryClick}
//             style={{ fontWeight: 'bold', color: '#0d6efd' }}
//           >
//             {category || 'N/A'}
//           </button>
//         </p>

//         <p className="card-text"><strong>Seller:</strong> {sellerName || 'Unknown'}</p>

//         <div className="d-flex justify-content-between">
//           <Link
//             to="/ViewVehicle"
//             state={{ vehicle }}
//             className="btn btn-primary btn-sm"
//           >
//             View Details
//           </Link>

//           {showFavouriteBtn && (
//             <button
//               className="btn btn-outline-danger btn-sm"
//               onClick={addToFavourites}
//             >
//               ❤️
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VehicleCard;



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function VehicleCard({
  title,
  price,
  city,
  image,
  category,
  id,
  sellerName,
  sellerEmail,
  sellerContact,
  showFavouriteBtn = true,
}) {
  const navigate = useNavigate();

  const vehicle = {
    title,
    price,
    city,
    image,
    category,
    id,
    sellerName,
    sellerEmail,
    sellerContact,
  };

  const addToFavourites = async () => {
    try {
      const res = await axios.get('http://localhost:5000/favourites');
      const existing = res.data;

      const isAlreadyAdded = existing.some(
        (v) => v.title === vehicle.title && v.city === vehicle.city
      );

      if (isAlreadyAdded) {
        alert('Already in favourites!');
        return;
      }

      await axios.post('http://localhost:5000/favourites', vehicle);
      alert('Added to favourites!');
    } catch (err) {
      console.error('Error adding to favourites:', err);
      alert('Failed to add to favourites.');
    }
  };

  const handleCategoryClick = () => {
    navigate(`/BuyUsedVehicle?category=${category}`);
  };

  return (
    <div className="card shadow-sm" style={{ width: '100%', maxWidth: '300px' }}>
      <img
        src={image}
        className="card-img-top"
        alt={title}
        style={{ height: '180px', objectFit: 'cover' }}
        onError={(e) =>
          (e.target.src = 'https://via.placeholder.com/300x180?text=No+Image')
        }
      />

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text mb-1"><strong>Price:</strong> ₹{price}</p>
        <p className="card-text mb-1"><strong>City:</strong> {city}</p>

        <p className="card-text mb-1">
          <strong>Category:</strong>{' '}
          <button
            className="btn btn-link p-0 m-0 align-baseline"
            onClick={handleCategoryClick}
            style={{ fontWeight: 'bold', color: '#0d6efd' }}
          >
            {category || 'N/A'}
          </button>
        </p>

        <p className="card-text"><strong>Seller:</strong> {sellerName || 'Unknown'}</p>

        <div className="d-flex justify-content-between">
          <Link
            to="/ViewVehicle"
            state={{ vehicle }}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>

          {showFavouriteBtn && (
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={addToFavourites}
            >
              ❤️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
// import React, { useEffect, useState } from 'react';
// import { getFromStorage, setToStorage } from '../../utils/storageUtils';

// const ManageAds = () => {
//   const [ads, setAds] = useState([]);

//   useEffect(() => {
//     const storedAds = getFromStorage('ads') || [];
//     console.log("Admin ManageAds - loaded ads:", storedAds);
//     setAds(storedAds);
//   }, []);

//   const handleDelete = (indexToDelete) => {
//     const updatedAds = ads.filter((_, index) => index !== indexToDelete);
//     setAds(updatedAds);
//     setToStorage('ads', updatedAds);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2 style={{ textAlign: 'center' }}>Manage Ads (All Users)</h2>

//       {ads.length === 0 ? (
//         <p>No ads found.</p>
//       ) : (
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//           gap: '20px',
//           marginTop: '20px'
//         }}>
//           {ads.map((vehicle, index) => (
//             <div key={index} style={{
//               border: '1px solid #ccc',
//               borderRadius: '10px',
//               padding: '15px',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//             }}>
//               <h3>{vehicle.title}</h3>
//               <p><strong>Category:</strong> {vehicle.category}</p>
//               <p><strong>City:</strong> {vehicle.city}</p>
//               <p><strong>Price:</strong> ₹{vehicle.price}</p>
//               <p><strong>Seller:</strong> {vehicle.sellerEmail}</p>

//               {vehicle.image1 && (
//                 <img
//                   src={vehicle.image1}
//                   alt="Vehicle 1"
//                   style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
//                 />
//               )}

//               {vehicle.image2 && (
//                 <img
//                   src={vehicle.image2}
//                   alt="Vehicle 2"
//                   style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
//                 />
//               )}

//               <button
//                 onClick={() => handleDelete(index)}
//                 style={{
//                   backgroundColor: '#e53935',
//                   color: '#fff',
//                   border: 'none',
//                   padding: '8px 16px',
//                   borderRadius: '5px',
//                   cursor: 'pointer'
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageAds;




import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageAds = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await axios.get('http://localhost:5000/ads');
        console.log("Admin ManageAds - loaded ads:", res.data);
        setAds(res.data);
      } catch (err) {
        console.error('Failed to load ads:', err);
      }
      
    };

    fetchAds();
  }, []);

  const handleDelete = async (idToDelete) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this ad?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/ads/${idToDelete}`);
      setAds(prev => prev.filter(ad => ad.id !== idToDelete));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Manage Ads (All Users)</h2>

      {ads.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '30px', color: 'gray' }}>
          🚫 No ads found.
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {ads.map((vehicle) => (
            <div key={vehicle.id} style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fafafa'
            }}>
              <h3>{vehicle.title}</h3>
              <p><strong>Category:</strong> {vehicle.category}</p>
              <p><strong>City:</strong> {vehicle.city}</p>
              <p><strong>Price:</strong> ₹{vehicle.price}</p>
              <p><strong>Seller Email:</strong> {vehicle.sellerEmail}</p>

              <div style={{ margin: '10px 0' }}>
                {vehicle.image1 && (
                  <img
                    src={vehicle.image1}
                    alt="Vehicle 1"
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '10px'
                    }}
                  />
                )}

                {vehicle.image2 && (
                  <img
                    src={vehicle.image2}
                    alt="Vehicle 2"
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '10px'
                    }}
                  />
                )}
              </div>

              <button
                onClick={() => handleDelete(vehicle.id)}
                style={{
                  backgroundColor: '#e53935',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageAds;

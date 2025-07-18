 import React, { useEffect, useState } from 'react';
import { getFromStorage, setToStorage } from '../../utils/storageUtils';

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const currentUser = getFromStorage('currentUser');

  useEffect(() => {
    if (!currentUser?.email) return;

    const allAds = getFromStorage('ads') || [];

    // ✅ Filter vehicles that belong to current user by email
    const myVehicles = allAds.filter(
      (v) => v.sellerEmail === currentUser.email
    );

    setVehicles(myVehicles);
  }, [currentUser?.email]);

  const handleDelete = (idToDelete) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
  if (!confirmDelete) return;

  // 1️⃣ Remove vehicle from ads
  const allAds = getFromStorage('ads') || [];
  const updatedAllAds = allAds.filter(
    (v) => !(v.sellerEmail === currentUser?.email && v.id === idToDelete)
  );
  setToStorage('ads', updatedAllAds);

  // 2️⃣ Remove from visible list
  const updatedMyVehicles = vehicles.filter((v) => v.id !== idToDelete);
  setVehicles(updatedMyVehicles);

  // 3️⃣ Remove that vehicle's chat from messages
  const allMessages = getFromStorage('messages') || [];
  const filteredMessages = allMessages.filter(
    (thread) => thread.vehicleId !== idToDelete
  );
  setToStorage('messages', filteredMessages);
};



  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4 text-center">My Vehicles for Sale</h2>

      {vehicles.length === 0 ? (
        <div className="alert alert-info text-center">
          You haven't added any vehicles yet.
        </div>
      ) : (
        <div className="row g-4">
         {vehicles.map((vehicle) => (
  <div className="col-12 col-sm-6 col-md-4" key={vehicle.id}>

              <div className="card shadow-sm h-100">
                <img
                  src={vehicle.image}
                  className="card-img-top"
                  alt={vehicle.title}
                  style={{ height: '180px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x180?text=Image+Not+Available';
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{vehicle.title}</h5>
                  <p className="card-text mb-1"><strong>Price:</strong> ₹{vehicle.price}</p>
                  <p className="card-text mb-1"><strong>City:</strong> {vehicle.city}</p>
                  <p className="card-text mb-3"><strong>Category:</strong> {vehicle.category}</p>
                  <button
                    className="btn btn-outline-danger mt-auto"
                    onClick={() => handleDelete(vehicle.id)}

                  >
                    🗑️ Remove Vehicle
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
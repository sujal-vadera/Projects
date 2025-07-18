import React, { useEffect, useState } from 'react';
import VehicleCard from '../../components/VehicleCard';

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(favs);
  }, []);

  const handleRemove = (target) => {
    const updatedFavs = favourites.filter(
      (v) =>
        !(
          v.title === target.title &&
          v.city === target.city &&
          v.category === target.category
        )
    );
    setFavourites(updatedFavs);
    localStorage.setItem('favourites', JSON.stringify(updatedFavs));
    alert(`${target.title} removed from favourites`);
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-2 text-center">Your Favourite Vehicles</h2>
      {favourites.length > 0 && (
        <h5 className="text-center text-secondary mb-4">
          Total: {favourites.length} vehicles
        </h5>
      )}

      <div className="row g-4">
        {favourites.length === 0 ? (
          <div className="text-center text-muted">No favourite vehicles yet.</div>
        ) : (
          favourites.map((vehicle, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={`${vehicle.id}-${index}`}
            >
              <VehicleCard
                title={vehicle.title}
                price={vehicle.price}
                city={vehicle.city}
                image={vehicle.image}
                category={vehicle.category}
                sellerName={vehicle.sellerName}
                id={vehicle.id}
                showFavouriteBtn={false}
              />
              <button
                className="btn btn-outline-danger btn-sm w-100 mt-2"
                onClick={() => handleRemove(vehicle)}
              >
                Remove from Favourites
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;

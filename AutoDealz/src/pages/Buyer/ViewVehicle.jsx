import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getFromStorage, setToStorage } from '../../utils/storageUtils';

const ViewVehicle = () => {
  const { state } = useLocation();
  const vehicle = state?.vehicle;
  const currentUser = getFromStorage('currentUser');
  const [messageText, setMessageText] = useState('');

  if (!vehicle) {
    return (
      <div className="container mt-4">
        <h4>No vehicle selected</h4>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!currentUser) {
      alert('Please login to send a message!');
      return;
    }

    if (!messageText.trim()) {
      alert('Please write a message.');
      return;
    }

    const allMessages = getFromStorage('messages') || [];

    const existingThreadIndex = allMessages.findIndex(
      (msg) =>
        msg.vehicleId === vehicle.id &&
        msg.buyerEmail === currentUser.email &&
        msg.sellerEmail === vehicle.sellerEmail
    );

    const newMessage = {
      senderEmail: currentUser.email,
      senderName: currentUser.name || '',
      text: messageText,
      timestamp: new Date().toLocaleString(),
    };

    if (existingThreadIndex !== -1) {
      // Existing chat thread
      allMessages[existingThreadIndex].chat.push(newMessage);
    } else {
      // Create new thread
      allMessages.push({
        vehicleId: vehicle.id,
        vehicleTitle: vehicle.title,
        buyerEmail: currentUser.email,
        buyerName: currentUser.name,
        sellerEmail: vehicle.sellerEmail,
        sellerName: vehicle.sellerName || 'Unknown',
        chat: [newMessage],
      });
    }

    setToStorage('messages', allMessages);
    alert('Message sent!');
    setMessageText('');
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Vehicle Details</h2>
      <div className="row">
        <div className="col-md-6">
          <img
            src={vehicle.image}
            alt={vehicle.title}
            className="img-fluid rounded shadow"
            style={{ maxHeight: '350px', objectFit: 'cover' }}
            onError={(e) =>
              (e.target.src = 'https://via.placeholder.com/350x200?text=Image+Not+Found')
            }
          />
        </div>
        <div className="col-md-6">
          <h3>{vehicle.title}</h3>
          <p><strong>Price:</strong> ₹{vehicle.price}</p>
          <p><strong>City:</strong> {vehicle.city}</p>
          <p><strong>Category:</strong> {vehicle.category}</p>
          <p><strong>Seller Name:</strong> {vehicle.sellerName || 'Unknown'}</p>
          <p><strong>Contact:</strong> {vehicle.sellerContact || 'Hidden'}</p>

          {/* Message Box */}
          <div className="mt-4">
            <h5>Send Message to Seller</h5>
            <textarea
              rows={3}
              className="form-control mb-2"
              placeholder="Type your message here..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleSendMessage}>
               Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVehicle;

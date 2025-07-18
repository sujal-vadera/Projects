import React, { useEffect, useState } from 'react';
import { getFromStorage, setToStorage } from '../../utils/storageUtils';

const Messages = () => {
  const [allMessages, setAllMessages] = useState([]);
  const [replyText, setReplyText] = useState({});
  const currentUser = getFromStorage('currentUser');

useEffect(() => {
  if (!currentUser) return;

  const messages = getFromStorage('messages') || [];
  const ads = getFromStorage('ads') || [];

  // ✅ Get valid vehicle IDs
  const validVehicleIds = ads.map(ad => ad.id);

  // ✅ Filter messages that belong to user AND vehicle still exists
  const userMessages = messages.filter(
    (thread) =>
      (thread.buyerEmail === currentUser.email ||
        thread.sellerEmail === currentUser.email) &&
      validVehicleIds.includes(thread.vehicleId)
  );

  setAllMessages(userMessages);
}, []);


  const handleReplyChange = (index, text) => {
    setReplyText((prev) => ({ ...prev, [index]: text }));
  };

  const handleReplySend = (index) => {
    const text = replyText[index]?.trim();
    if (!text) {
      alert('Please write a reply!');
      return;
    }

    const updatedMessages = [...allMessages];
    const thread = updatedMessages[index];

    const senderRole = currentUser.email === thread.buyerEmail ? 'buyer' : 'seller';
    const senderName = currentUser.name || currentUser.email;

    const newReply = {
      sender: senderRole,
      senderEmail: currentUser.email,
      senderName,
      text,
      timestamp: new Date().toLocaleString(),
    };

    thread.chat.push(newReply);

    updatedMessages[index] = thread;
    setAllMessages(updatedMessages);
    setToStorage('messages', updatedMessages);
    setReplyText((prev) => ({ ...prev, [index]: '' }));
  };

  const getSenderLabel = (msg, thread) => {
    if (msg.senderEmail === currentUser.email) {
      return 'You';
    } else {
      // opposite user
      if (msg.sender === 'buyer') {
        return thread.buyerName || thread.buyerEmail;
      } else {
        return thread.sellerName || thread.sellerEmail;
      }
    }
  };

  const getBubbleClass = (msg) => {
    return msg.senderEmail === currentUser.email
      ? 'bg-success text-white align-self-end'
      : 'bg-primary text-white align-self-start';
  };

  return (
    <div className="container my-4">
      <h2 className="text-center fw-bold mb-4">💬 Your Messages</h2>

      {allMessages.length === 0 ? (
        <p className="text-center text-muted">No messages found.</p>
      ) : (
        allMessages.map((thread, index) => (
          <div key={index} className="border rounded bg-light p-3 mb-4 shadow-sm">
            <h5 className="mb-2 text-primary">🚗 {thread.vehicleTitle}</h5>

            {/* Chat History */}
            <div
              className="bg-white border p-3 rounded mb-3"
              style={{
                maxHeight: '250px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {thread.chat.map((msg, i) => (
                <div
                  key={i}
                  className={`mb-2 p-2 rounded ${getBubbleClass(msg)}`}
                  style={{ maxWidth: '75%' }}
                >
                  <div>
                    <strong>{getSenderLabel(msg, thread)}:</strong>
                  </div>
                  <div>{msg.text}</div>
                  <div style={{ fontSize: '0.8em' }}>{msg.timestamp}</div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="d-flex flex-column flex-sm-row gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Write a reply..."
                value={replyText[index] || ''}
                onChange={(e) => handleReplyChange(index, e.target.value)}
              />
              <button className="btn btn-success" onClick={() => handleReplySend(index)}>
                Send
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;

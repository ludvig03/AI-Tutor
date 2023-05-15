import React, { useState } from 'react';
import axios from 'axios';

function ChatApp() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    try {
      const url = 'https://6c6e-2a02-fe1-1280-1a00-bd4e-ee57-bd33-8343.ngrok-free.app/chat';
      const payload = { melding: message };
      const response = await axios.post(url, payload);
      const answer = response.data.answer;

      setMessages((prevMessages) => [...prevMessages, { message, answer }]);
      console.log(answer)
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index}>
            <p>User: {msg.message}</p>
            <p>Response: {msg.answer}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatApp;
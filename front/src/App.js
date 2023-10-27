/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});
function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("recive", (recivemsg) => {
      setMessages((prevMessages) => [...prevMessages, recivemsg]);
    });
  }, [socket]);

  return (
    <div className="App">
      <h1>Real-Time Cha..</h1>
      <div className="message-container">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
      </div>
      <form className="input-container">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit" onClick={handleSendMessage}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from "react";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [recivemessages, setreciveMessage] = useState([]);
  const messagesEndRef = useRef();

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("message", messageData);
      setreciveMessage((prev) => [...prev, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message, recivemessages]);

  useEffect(() => {
    socket.on("recive", (recivemsg) => {
      setreciveMessage((prevMessages) => [...prevMessages, recivemsg]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p> Group Name : {recivemessages?.[0]?.room} </p>
      </div>
      <div className="chat-body">
        {recivemessages.map((messageContent) => {
          return (
            <div
              className="message"
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
                <div ref={messagesEndRef} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={message}
          placeholder="Hey..."
          onChange={handleInputChange}
          onKeyPress={(event) => {
            event.key === "Enter" && handleSendMessage();
          }}
        />
        <button onClick={handleSendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;

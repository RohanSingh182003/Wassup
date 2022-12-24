import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chats = ({ socket, name, room }) => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (msg === "") return undefined;
    const message = {
      msg,
      id: room,
      author: name,
      time: new Date().getHours() + ':' + new Date().getMinutes(),
    };
    socket.emit("send_message", message);
    setMessages([...messages, message]);
    setMsg("");
  };
  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages([...messages, message]);
    });
  }, [socket]);

  useEffect(() => {
    if (name === "" || room === "") {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-500 grid place-items-center">
      <div className="p-6 bg-white rounded-md">
        {/* heading  */}
        <div className="mb-8 flex items-center justify-between">
          <p className="text-2xl italic text-primary">Wassup Chats</p>
          <p onClick={() => navigate("/")} className="btn btn-ghost">
            back
          </p>
        </div>
        {/* ------------------------------------- chat------------------------------------- */}
        <div className="w-full md:w-96 h-96 relative overflow-y-scroll mb-4">
          {/* ---------------------------------- messages ---------------------------------- */}
          {messages.map((m, i) => {
            return (
              <div
                key={i}
                className={`chat ${
                  m.author === name ? "chat-end" : "chat-start"
                } mb-2`}
              >
                <div className="chat-header">
                  {m.author === name ? "you" : m.author}
                  <time className="text-xs opacity-50 mx-2">{m.time}</time>
                </div>
                <div className="chat-bubble bg-primary">{m.msg}</div>
              </div>
            );
          })}
        </div>
        <form onSubmit={sendMessage} className="form-control w-full">
          <label className="input-group">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              type="text"
              placeholder="message..."
              className="input input-bordered"
            />
            <button
              type="submit"
              onClick={sendMessage}
              className="bg-primary text-white px-2"
            >
              Send
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default Chats;

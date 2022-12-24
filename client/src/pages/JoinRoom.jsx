import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoom = ({ setName, setRoom }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setName(userName);
    setRoom(userId);
    setUserName("");
    setUserId("");
    navigate("/chats");
  };
  return (
    <div className="min-h-screen bg-blue-500 grid place-items-center">
      <div className="p-8 bg-white rounded-md">
        <p className="text-center text-2xl italic text-primary mb-12">
          Wassup Login
        </p>
        {/* -------------- join room -------------- */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Type your name here"
            className="input input-bordered w-full max-w-xs"
          />
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            type="text"
            placeholder="Type room id here"
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary btn-outline">
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;

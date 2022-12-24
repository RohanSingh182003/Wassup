import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import io from 'socket.io-client'
import Chats from "./pages/Chats";
import JoinRoom from "./pages/JoinRoom";

const App = () => {

  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  const socket = io.connect("http://localhost:4000")
  useEffect(() => {
    socket.emit('join_user',room)
  }, [socket])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route exact index element={<JoinRoom setName={setName} setRoom={setRoom} />} />
        <Route exact path="/chats" element={<Chats socket={socket} name={name} setName={setName} room={room} setRoom={setRoom} />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;

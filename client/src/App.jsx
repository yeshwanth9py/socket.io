import React, { useState, useEffect, useMemo } from 'react'
import {io} from "socket.io-client";


const socket = io.connect("http://localhost:3001");

function App() {
  const [msg, setMsg] = useState("");

  const [rm, setRm] = useState("");
  const [room, setRoom] = useState("");

  const submit = ()=>{
    socket.emit("send-msg", {msg,room});
    setMsg("");
  }

  const roomsubmit = ()=>{
    socket.emit("join-room", room);
  }

  useEffect(()=>{
    socket.on("recieve-msg", (data)=>{
      setRm(data);
    })
  },[])
  
  return (
    <>
      msg:-
      <input type="text" value={msg} onChange={(e)=>setMsg(e.target.value)}/>
      <button onClick={submit}>submit</button>
      <br/>
      room:-
      <input value={room} onChange={(e)=>setRoom(e.target.value)}/>
      <button onClick={roomsubmit}>submit</button>
      {rm}
    </>
  )
  
}

export default App
import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
import Alert from "./components/Alert";
import About from "./components/About.jsx";
import Notestate, { NoteContext } from "./context/Notestate";
import { Signup } from "./components/Signup";



export default function App() {
  const [alert, setAlert] = useState(null);

  const showAlert=(message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    }, 1500)
  }

  return (
    <Notestate>
      <Alert alert={alert}/>
      <BrowserRouter>
        <Navbar /> 
        
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/> } />
          </Routes>
        </div>
      </BrowserRouter>
    </Notestate>
  );
}






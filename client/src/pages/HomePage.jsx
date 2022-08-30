//Componentes
import React, { useState, useEffect } from "react";
import Chat from "../components/Chat/Chat";
import UserLogIn from "../components/UserLogIn/UserLogIn";
//Estilos
import "./HomePage.css";

function HomePage() {
  const [logged, setLogged] = useState(false)
  const setShowChat = (mostrar) => {
    if (mostrar) {
      setLogged(true)
    }
  }
  //funciones
  useEffect(() => {}, [logged]);
  return (
    <>
      <h1>Home</h1>
      {logged ? (
        <>
          <UserLogIn revisarMostrar={setShowChat}/>
          <Chat />
        </>
      ) : (
        <>
          <UserLogIn revisarMostrar={setShowChat}/>
        </>
      )}
    </>
  );
}

export default HomePage;

//Componentes
import React, { useState, useEffect } from "react";
import Chat from "../components/Chat/Chat";
import UserLogIn from "../components/UserLogIn/UserLogIn";
//Estilos
import "./HomePage.css";

function HomePage() {
  const [isLogged, setIsLogued] = useState(false);
  //funciones
  useEffect(() => {}, [isLogged]);
  return (
    <>
      <h1>Home</h1>
      {isLogged ? (
        <>
          <UserLogIn />
          <Chat />
        </>
      ) : (
        <>
          <UserLogIn />
        </>
      )}
    </>
  );
}

export default HomePage;

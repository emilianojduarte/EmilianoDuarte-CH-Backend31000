//Componentes
import React from "react";
import Chat from "../components/Chat/Chat";
//Estilos
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      {/* Section chat en tiempo real */}
      <Chat />
    </>
  );
}

export default HomePage;

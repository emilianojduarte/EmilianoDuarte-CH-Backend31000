//Componentes
import React from "react";
import Chat from "../components/Chat/Chat";
import DinamicTable from "../components/DinamicTable/DinamicTable";
//Estilos
import './HomePage.css'

function HomePage () {
    return(
        <>
            <h1>Home</h1>
            {/* Section tabla dinamica */}
            <DinamicTable />
            {/* Section chat en tiempo real */}
            <Chat />
        </>
    );
}

export default HomePage;
//Componentes
import React, { useState, useEffect } from "react";
//Estilos

function RandomsPage() {
  //variables
  const [datos, setDatos] = useState({});
  const [keys, setKeys] = useState([]);
  const [dibujar, setDibujar] = useState(false);
  //funciones
  const getInfo = async () => {
    const response = await fetch(`http://localhost:3001/api/randoms`, {
      method: "get",
    });
    let data = await response.json();

    return data;
  };
  useEffect(() => {
    getInfo().then((data) => {
      setDatos(data);
      let tempKeys = Object.keys(datos);
      setKeys(tempKeys);
      setDibujar(true);
    });
  }, [dibujar]);
  return (
    <>
      <h2>Randoms</h2>
      <div>
        {dibujar?(
          keys.map((element) => {
            let retorno = `Numero ${element} = Salio ${datos[element]} veces`;
            return <p> {retorno} </p>;
          })
        ):(
          <p> Cargando... </p>
        )}
      </div>
    </>
  );
}

export default RandomsPage;

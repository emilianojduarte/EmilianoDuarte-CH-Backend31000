//Componentes
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
//Estilos

function RandomsPage() {
  //variables
  const [datos, setDatos] = useState({});
  const [keys, setKeys] = useState([]);
  const [dibujar, setDibujar] = useState(false);
  const search = useLocation().search;
  //funciones
  const getInfo = async () => {
    let data;
    if (search) {
      const response = await axios.get(`http://localhost:3001/api/randoms${search}`);
      data = await response.data;
    } else {
      const response = await axios.get(`http://localhost:3001/api/randoms`);
      data = await response.data;
    }
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
        {dibujar ? (
          keys.map((element) => {
            let retorno = `Numero ${element} = Salio ${datos[element]} veces`;
            return <p> {retorno} </p>;
          })
        ) : (
          <div>
            <p> Cargando... </p>
          </div>
        )}
      </div>
    </>
  );
}

export default RandomsPage;

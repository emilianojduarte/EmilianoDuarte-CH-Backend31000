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
  const [info, setInfo] = useState({});
  const [memory, setMemory] = useState({});
  const [args, setArgs] = useState({});
  //funciones
  const getData = async () => {
    let data;
    if (search) {
      const response = await axios.get(
        `http://localhost:3010/api/randoms${search}`
      );
      data = await response.data;
    } else {
      const response = await axios.get(`http://localhost:3010/api/randoms`);
      data = await response.data;
    }
    return data;
  };
  const getInfo = async () => {
    const response = await fetch("http://localhost:3002/api/info", {
      method: "get",
    });
    let data = await response.json();
    setInfo(data);
    setMemory(data.memory);
    setArgs(data.args);
    return data;
  };
  useEffect(() => {
    getInfo();
    getData().then((data) => {
      setDatos(data);
      let tempKeys = Object.keys(datos);
      setKeys(tempKeys);
      setDibujar(true);
    });
  }, [dibujar]);
  return (
    <>
      <div>
        <h2>Info</h2>
        <div>
          <p>Plataforma: {info.platform}</p>
          <p>Version: {info.version}</p>
          <p>Path: {info.path}</p>
          <p>PID: {info.pid}</p>
          <p>Folder: {info.folder}</p>
          <p>
            Memory
            <br></br>
            Rss: {memory.rss}
            <br></br>
            HeapTotal: {memory.heapTotal}
            <br></br>
            HeapUsed: {memory.heapUsed}
            <br></br>
            External: {memory.external}
            <br></br>
            ArrayBuffers: {memory.arrayBuffers}
          </p>
          <p>
            Args
            <br></br>
            _: {args._}
            <br></br>
            $0: {args.$0}
          </p>
        </div>
      </div>
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

//Componentes
import React, { useState, useEffect } from "react";
//Estilos

function InfoPage() {
  //variables
  const [info, setInfo] = useState({});
  const [memory, setMemory] = useState({});
  const [args, setArgs] = useState({});
  //funciones
  const getInfo = async () => {
    const response = await fetch("http://localhost:3010/api/info", {
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
  }, []);
  return (
    <>
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
    </>
  );
}

export default InfoPage;
